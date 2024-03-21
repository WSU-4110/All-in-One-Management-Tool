import { containsNumber, containsSpace, containsUpperCase, eightCharacters, fieldNotEmpty, checkEmailValidity, checkPasswordsMatch } from './signup';

test('Sends a string without a number to check if it has a number', () => {
    const result = containsNumber('abcdefg');
    expect(result).toBe(false);
});

test('Sends a string with a number to check if it has a number', () => {
    expect(containsNumber("abcd1fg")).toBe(true);
  });

test('Sends a string with a space to check if it has a space', () => {
    expect(containsSpace('abcd fg')).toBe(false);
  });

test('Sends a string without a space to check if it has a space', () => {
    expect(containsSpace("abcdefg")).toBe(true);
  });

test('Sends a string without an uppercase letter to check if it has an uppercase letter', () => {
    expect(containsUpperCase('abcdefg')).toBe(false);
  });
  
test('Sends a string with an uppercase letter to check if it has an uppercase letter', () => {
    expect(containsUpperCase("abcdEfg")).toBe(true);
  });
  
test('Sends a string without eight characters to check if it has eight characters', () => {
    expect(eightCharacters('abcdefg')).toBe(false);
  });
  
test('Sends a string with eight characters to check if it has eight characters', () => {
    expect(eightCharacters("abcdefgh")).toBe(true);
  });
  
test('Sends an empty string to check if it is not empty', () => {
    expect(fieldNotEmpty('')).toBe(false);
  });
  
test('Sends an non empty string to check if it is not empty', () => {
    expect(fieldNotEmpty("abcdefg")).toBe(true);
  });
  
test('Sends a non valid email address to check if it is valid', () => {
    expect(checkEmailValidity('abcdefg')).toBe(false);
  });
  
test('Sends a valid email address to check if it is valid', () => {
    expect(checkEmailValidity("abcdefg@gmail.com")).toBe(true);
  });

test('Sends two non-matching strings to check if they match', () => {
    expect(checkPasswordsMatch("abcdefg", "abcd")).toBe(false);
  });
  
test('Sends two matching strings to check if they match', () => {
    expect(checkPasswordsMatch("abcdefg", "abcdefg")).toBe(true);
  });