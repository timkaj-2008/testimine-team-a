const { applyDiscount } = require('./discount');

// 2a — BLACK BOX: write tests from the specification only. Do not open discount.js.
test('no code returns the price unchanged', () => {
  expect(applyDiscount(100, undefined)).toBe(100);
});

// 2b — WHITE BOX: run coverage, open discount.js, cover every branch.

// 2c — GREY BOX: use what you learned about the code structure to design new tests.
