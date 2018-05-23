const validatePassword = function (password) {
  let isValid = true;

  const validatedFields = {
    containsUsername: false, // TODO from API
    containsUsernameReverse: false, // TODO from API
    hasEightChars: password.length > 7,
    hasOneLetter: /[a-zA-Z]/.test(password),
    hasOneNumber: /\d/.test(password),
    hasSpecialChars: /^(?=.*[_\W]).+$/.test(password),
    repeatingChars: /(.)\1{3,}/.test(password),
    sameAsLastFive: password === 'password' // TODO from API
  };

  for (const field in validatedFields) {
    const isHidden = [
      'containsUsername',
      'containsUsernameReverse',
      'repeatingChars',
      'sameAsLastFive'
    ].indexOf(field) !== -1;

    if (!validatedFields[field] && !isHidden) {
      isValid = false;
    }
  }

  return {
    isValid: isValid,
    validatedFields: validatedFields
  };
};

export default validatePassword;
