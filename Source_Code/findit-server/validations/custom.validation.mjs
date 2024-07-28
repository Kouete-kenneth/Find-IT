const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const phoneNumber = (value, helpers) => {
  // Check if the phone number contains only digits
  if (!/^\d+$/.test(value)) {
    return helpers.message('phone number must contain only digits');
  }
  // Check if the phone number is exactly 10 digits long
  if (value.length !== 9) {
    return helpers.message('phone number must be exactly 10 digits');
  }
  return value;
};


export { objectId, password,phoneNumber };
