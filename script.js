// TODO: Create function to check first name, last name, and message
// EMPTY: send error message
const form = document.querySelector("form");

function checkFirstName() {
  // 1. initialization
  const fname = document.getElementById("fname");
  const errorMessage = document.getElementById("fname-error");

  // 2. validate
  if (fname.validity.valueMissing) {
    console.log("value is missing.");
    // 3. update error message
    errorMessage.textContent = "This field is required";
  }
}

const fields = [
  {
    input: document.getElementById("fname"),
    error: document.getElementById("fname-error"),
    messages: { valueMissing: "This field is required" },
  },
  {
    input: document.getElementById("lname"),
    error: document.getElementById("lname-error"),
    messages: { valueMissing: "This field is required" },
  },
  {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
    messages: {
      valueMissing: "This field is required",
      typeMismatch: "Please enter a valid email address",
    },
  },
  {
    input: document.getElementById("message"),
    error: document.getElementById("message-error"),
    messages: { valueMissing: "This field is required" },
  },
];

function validateField(field) {
  const { input, error, messages } = field;
  const isValid = input.checkValidity();

  input.classList.toggle("invalid", !isValid);

  if (isValid) {
    error.textContent = "";
  } else {
    // check which error it is then display the proper error message
    const failedRule = Object.keys(messages).find(
      (rule) => input.validity[rule],
    );
    error.textContent = messages[failedRule] || "This field is invalid";
  }

  return isValid;
}

function validateQuery() {
  const fieldset = document.querySelector("fieldset");
  const radios = document.querySelectorAll('input[name="query"]');
  const isValid = Array.from(radios).some((radio) => radio.checked);
  const error = document.querySelector("#query-error");

  error.classList.toggle("invalid", !isValid);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fields.map(validateField);
  validateQuery();
});
