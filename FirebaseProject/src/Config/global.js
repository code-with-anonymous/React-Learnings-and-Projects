// src/utils/validation.js

/**
 * Validates if the provided email is in a correct format.
 * 
 * @param {string} email - The email address to validate.
 * @returns {boolean} - Returns true if the email is valid, otherwise false.
 */
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}



// utils.js
export const getId = () => {
    return Math.random().toString(36).slice(2);
  };
  