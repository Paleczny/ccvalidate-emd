/**
 * Function to validate a credit card number using the Luhn algorithm.
 *
 * The Luhn algorithm is used to validate various identification numbers, and
 * this implementation checks the validity of a credit card number.
 *
 * @param {string} cardNumber - The credit card number as a string.
 * @returns {boolean} - Returns true if the card number is valid, false otherwise.
 *
 * @example
 * const isValid = validateCardNumber('1234567812345670');
 * console.log(isValid); // Output: true or false
 */
export function validateCardNumber(cardNumber: string): boolean {
  let sum = 0;
  let shouldDouble = false;

  if (cardNumber.length === 0 )
  {
    return false
  }

  // Process digits from right to left
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);

    if (isNaN(digit)) {
      return false; // Invalid character found
    }

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}
