const { calculateTotal, sendReceipt } = require('./cart');

describe('calculateTotal', () => {
  test('returns 0 for an empty cart', () => {
    // Arrange
    const items = [];
    // Act
    const total = calculateTotal(items);
    // Assert
    expect(total).toBe(0);
  });

  // TODO: add your tests here (see the handout, chapter 4.4)
});

describe('sendReceipt', () => {
  // TODO: test sendReceipt with a mock emailService
});
