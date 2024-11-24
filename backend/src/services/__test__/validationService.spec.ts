import { validateCardNumber } from '../validationService';

describe('validateCardNumber', () => {
  it('should return true for a valid credit card number', () => {
    const validCardNumber = '4532015112830366';
    expect(validateCardNumber(validCardNumber)).toBe(true);
  });

  it('should return false for an invalid credit card number', () => {
    const invalidCardNumber = '1234567812345678';
    expect(validateCardNumber(invalidCardNumber)).toBe(false);
  });

  it('should return false for a card number with non-numeric characters', () => {
    const invalidCardNumberWithChars = '4532a1511283b366';
    expect(validateCardNumber(invalidCardNumberWithChars)).toBe(false);
  });

  it('should return true for another valid credit card number', () => {
    const anotherValidCardNumber = '6011514433546201';
    expect(validateCardNumber(anotherValidCardNumber)).toBe(true);
  });

  it('should return false for an empty card number', () => {
    const emptyCardNumber = '';
    expect(validateCardNumber(emptyCardNumber)).toBe(false);
  });
});