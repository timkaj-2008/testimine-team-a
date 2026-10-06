const { isValidPassword } = require('./password');

test('returns true for exactly 8 characters', () => {
  expect(isValidPassword('abcdefgh')).toBe(true);
});

// TODO: add tests 2–6 from the handout table (chapter 4.1)
