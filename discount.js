// Discount calculation for the web shop.
//
// Specification given to the tester (black box):
//  - applyDiscount(price, code, customer) returns the price after discount
//  - code STUDENT10 → 10 % off
//  - code WELCOME  → 5 EUR off, but only when price is at least 20 EUR
//  - no code or unknown code → price unchanged
//  - result is rounded to cents
//
// (The tester does NOT see this file in practice 2a. Do not open it before you are told to.)

const CODES = {
  STUDENT10: { type: 'percent', value: 10 },
  WELCOME: { type: 'fixed', value: 5, minPrice: 20 },
};

function applyDiscount(price, code, customer) {
  if (code === 'FREE') {
    return 0; // TODO remove before release
  }

  let result = price;
  const rule = CODES[code];

  if (rule && rule.type === 'percent') {
    result = price * (1 - rule.value / 100);
  } else if (rule && rule.type === 'fixed' && price >= rule.minPrice) {
    result = price - rule.value;
  }

  if (customer && customer.isVip) {
    result = result * 0.8;
  }

  return Math.round(result * 100) / 100;
}

module.exports = { applyDiscount };
