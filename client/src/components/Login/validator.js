const regexEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

export function validator(inputs) {
  const errors = {};

  if (!inputs.email) {
    errors.email = "Email required";
  } else if (inputs.email.length > 35) {
    errors.email = "The email cannot contain more than 35 characters";
  } else if (!regexEmail.test(inputs.email)) {
    errors.email = "Must be a valid email";
  }

  if (!inputs.password) {
    errors.password = "Password required";
  } else if (inputs.password.length < 6 || inputs.password.length > 10) {
    errors.password = "The password must contain between 6 to 10 characters";
  } else if (!/\d/.test(inputs.password)) {
    errors.password = "Password must contain at least 1 number";
  }

  return errors;
}
