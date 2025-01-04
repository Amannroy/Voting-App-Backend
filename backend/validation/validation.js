// Validate Email
export const validateEmail = (email) => {
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    const error = new Error("Invalid Email Format");
    error.statusCode = 400;
    throw error;
  }
};

// Validate Password
export const validatePassword = (password) => {
  if (!password || password.length < 6) {
    const error = new Error("Password must be atleast 6 characters long");
    error.statusCode = 400;
    throw error;
  }
};

// Validate Aadhar Card Number
export const validateAadharCardNumber = (aadharCardNumber) => {
  if (!/^\d{12}$/.test(aadharCardNumber)) {
    const error = new Error("Aadhar Card Number must be exactly 12 digits");
    error.statusCode = 400;
    throw error;
  }
};
