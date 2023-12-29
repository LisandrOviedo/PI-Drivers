const validarURL = new RegExp(/(https?:\/\/.*\.(?:png|jpg))/i);

export function validator(inputs) {
  const errors = {};

  if (!inputs.name) {
    errors.name = "Name required";
  } else if (inputs.name.length < 2) {
    errors.name = "Name must contain at least 2 characters";
  }

  if (!inputs.last_name) {
    errors.last_name = "Last name required";
  } else if (inputs.last_name.length < 2) {
    errors.last_name = "Last name must contain at least 2 characters";
  }

  if (!inputs.description) {
    errors.description = "Description required";
  } else if (inputs.description.length < 2) {
    errors.description = "Description must contain at least 2 characters";
  }

  if (!inputs.image) {
    errors.image = "Image required";
  } else if (!validarURL.test(inputs.image)) {
    errors.image = "Must be a valid URL";
  }

  if (!inputs.nationality) {
    errors.nationality = "Nationality required";
  }

  if (!inputs.birthdate) {
    errors.birthdate = "Birthdate required";
  }

  return errors;
}
