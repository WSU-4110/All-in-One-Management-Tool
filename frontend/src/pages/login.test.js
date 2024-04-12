import { isValidUsername, isValidPassword, containsNumber, containsUpperCase, containsSpecialChar, areCredentialsValid } from './loginUtils';

test('validates username correctly', () => {
    expect(isValidUsername('testuser')).toBe(true);
    expect(isValidUsername('test user')).toBe(false);
    expect(isValidUsername('')).toBe(false);
});

test('validates password for minimum length and no spaces', () => {
    expect(isValidPassword('password123')).toBe(true);
    expect(isValidPassword('pass')).toBe(false);
    expect(isValidPassword('password 123')).toBe(false);
});

test('checks if password contains at least one number', () => {
    expect(containsNumber('password1')).toBe(true);
    expect(containsNumber('password')).toBe(false);
});

test('checks if password contains at least one uppercase letter', () => {
    expect(containsUpperCase('Password')).toBe(true);
    expect(containsUpperCase('password')).toBe(false);
});

test('checks if password contains at least one special character', () => {
    expect(containsSpecialChar('password@')).toBe(true);
    expect(containsSpecialChar('password')).toBe(false);
});

test('validates combined credentials', () => {
    expect(areCredentialsValid('testuser', 'Password1@')).toBe(true);
    expect(areCredentialsValid('test user', 'password')).toBe(false);
});
