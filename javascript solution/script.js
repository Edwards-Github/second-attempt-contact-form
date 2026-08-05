const form = document.querySelector("form");

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
    // Find which constraint failed and show the matching message
    const failedRule = Object.keys(messages).find(
      (rule) => input.validity[rule],
    );
    error.textContent = messages[failedRule] || "This field is invalid";
  }

  return isValid;
}

function validateRadioGroup() {
  const radios = document.querySelectorAll('input[name="query"]');
  const fieldset = document.querySelector("fieldset");
  const error = document.getElementById("query-error");
  const isValid = Array.from(radios).some((radio) => radio.checked);

  fieldset.classList.toggle("invalid", !isValid);
  error.textContent = isValid ? "" : "Please select a query type";

  return isValid;
}

function validateConsent() {
  const consent = document.getElementById("consent");
  const error = document.getElementById("consent-error");
  const isValid = consent.checked;

  consent.classList.toggle("invalid", !isValid);
  error.textContent = isValid
    ? ""
    : "To submit this form, please consent to being contacted";

  return isValid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const results = fields.map(validateField);
  results.push(validateRadioGroup());
  results.push(validateConsent());

  const formIsValid = results.every(Boolean);

  if (formIsValid) {
    // form.submit(), fetch(), whatever you actually want to do
    console.log("Form is valid — submitting!");
  }
});
