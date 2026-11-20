// A85204925104 - started 2026-11-13
// Lab 6 - My Student Portal (used by index.html and board.html)

const ENROLMENT = "A85204925104";
const PASSWORD_MIN = 6; // P
const NAME_MAX = 25;     // M
const PASS_MARK = 44;    // T

// ===== Page 1: registration form =====

const regForm = document.getElementById("regForm");

if (regForm !== null) {
  const fullName = document.getElementById("fullName");
  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const password = document.getElementById("password");
  const confirmPassword = document.getElementById("confirmPassword");
  const city = document.getElementById("city");
  const errorsList = document.getElementById("errors");
  const nameLeft = document.getElementById("nameLeft");
  const cityLine = document.getElementById("cityLine");

  const allFields = [fullName, email, phone, password, confirmPassword, city];

  // returns error text for one field, or "" if it is ok
  function checkField(field) {
    const value = field.value.trim();

    if (value === "") {
      return "All fields are required";
    }
    if (field === fullName && value.length > NAME_MAX) {
      return "Name must be maximum " + NAME_MAX + " characters";
    }
    if (field === email && !/^\S+@\S+\.\S+$/.test(value)) {
      return "Email is not valid";
    }
    if (field === phone && !/^[0-9]{9}$/.test(value)) {
      return "Phone must be exactly 9 digits";
    }
    if (field === password && value.length < PASSWORD_MIN) {
      return "Password must be at least " + PASSWORD_MIN + " characters";
    }
    if (field === confirmPassword && field.value !== password.value) {
      return "Passwords do not match";
    }
    return "";
  }

  function validate() {
    const errors = [];
    for (let i = 0; i < allFields.length; i++) {
      const message = checkField(allFields[i]);
      if (message !== "") {
        allFields[i].classList.add("invalid");
        // do not repeat the same message two times
        if (!errors.includes(message)) {
          errors.push(message);
        }
      } else {
        allFields[i].classList.remove("invalid");
      }
    }
    return errors;
  }

  function showErrors(errors) {
    errorsList.textContent = "";
    for (let i = 0; i < errors.length; i++) {
      const li = document.createElement("li");
      li.textContent = errors[i];
      errorsList.appendChild(li);
    }
  }

  // blur: red border if the field is not valid
  for (let i = 0; i < allFields.length; i++) {
    allFields[i].addEventListener("blur", function () {
      if (checkField(this) !== "") {
        this.classList.add("invalid");
      } else {
        this.classList.remove("invalid");
      }
    });
  }

  // keyup: how many characters left in the name
  fullName.addEventListener("keyup", function () {
    let left = NAME_MAX - fullName.value.length;
    if (left < 0) {
      left = 0;
    }
    nameLeft.textContent = left + " characters left";
  });

  // change: show chosen city
  city.addEventListener("change", function () {
    if (city.value === "") {
      cityLine.textContent = "";
    } else {
      cityLine.textContent = "You chose " + city.value;
    }
  });

  // submit
  regForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const errors = validate();
    showErrors(errors);
    if (errors.length > 0) {
      return;
    }
    const name = fullName.value.trim();
    const ok = confirm("Register " + name + "?");
    if (ok) {
      window.location.href = "board.html?name=" + encodeURIComponent(name);
    }
  });
}

console.log(ENROLMENT);
