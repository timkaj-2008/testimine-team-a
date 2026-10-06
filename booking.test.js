const { bookingPrice } = require('./booking');

test('one night, one guest costs 50', () => {
  expect(bookingPrice(1, 1)).toBe(50);
});

// TODO: write tests from the rules in booking.js (handout chapter 3).
// Expected: four of your tests fail. Each failure is a different kind of defect.
