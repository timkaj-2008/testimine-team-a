// Shopping cart price calculation.
// Rules:
//  - total = sum of price * qty
//  - discount code STUDENT10 gives 10% off
//  - orders below 100 EUR pay a 5 EUR shipping fee, from 100 EUR shipping is free
//  - items must be an array, otherwise a TypeError is thrown
//
// NOTE: this file contains one intentional bug. Your tests should find it.

const SHIPPING_FEE = 5;
const FREE_SHIPPING_FROM = 100;

function calculateTotal(items, discountCode) {
  if (!Array.isArray(items)) {
    throw new TypeError('items must be an array');
  }
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  let total = subtotal;
  if (discountCode === 'student10') {
    total = subtotal * 0.9;
  }
  if (subtotal > 0 && subtotal < FREE_SHIPPING_FROM) {
    total += SHIPPING_FEE;
  }
  return Math.round(total * 100) / 100;
}

function sendReceipt(emailService, order) {
  const text = `Order ${order.id}: total ${order.total} EUR`;
  emailService.send(order.email, text);
  return true;
}

module.exports = { calculateTotal, sendReceipt };
