export function isValidUsername(username) {
    // Checks if the username is non-empty and has no spaces
    return username.trim() !== "" && !/\s/.test(username);
}

export function isValidPassword(password) {
    // Checks if the password has at least 8 characters and no spaces
    return password.length >= 8 && !/\s/.test(password);
}

export function containsNumber(password) {
    // Checks if the password contains at least one digit
    return /\d/.test(password);
}

export function containsUpperCase(password) {
    // Checks if the password contains at least one uppercase letter
    return /[A-Z]/.test(password);
}

export function containsSpecialChar(password) {
    // Checks if the password contains at least one special character
    return /[!@#$%^&*(),.?":{}|<>]/.test(password);
}

export function areCredentialsValid(username, password) {
    // Simplistic check for valid username and password
    return isValidUsername(username) && isValidPassword(password);
}
