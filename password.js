// Password validation.
// Rule: a password is valid when it has at least 8 characters
// AND it does not consist of spaces only.
//
// NOTE: this file contains one intentional bug. Your tests should find it.

function isValidPassword(password) {
  if (typeof password !== 'string') {
    return false;
  }
  if (password.trim().length === 0) {
    return false;
  }
  return password.length > 8;
}

module.exports = { isValidPassword };
