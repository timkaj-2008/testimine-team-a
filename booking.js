// Hotel booking price calculation.
//
// Rules:
//  - nights: whole number from 1 to 30 (inclusive)
//  - guests: whole number from 1 to 4 (inclusive); if not given, defaults to 1
//  - price = nights * 50 EUR, plus 10 EUR per night for every guest beyond the first
//  - code WEEKEND gives 15 % off when the stay is at least 2 nights
//  - the discount code is not case sensitive (weekend = WEEKEND)
//  - invalid nights or guests → throws an Error
//
// NOTE: this file contains FOUR intentional defects. Your tests should find them all.

const BASE_PRICE = 50;
const EXTRA_GUEST_PRICE = 10;

function bookingPrice(nights, guests, code) {
  if (!Number.isInteger(nights) || nights < 1 || nights >= 30) {
    throw new Error('nights must be between 1 and 30');
  }
  if (!Number.isInteger(guests) || guests < 1 || guests > 4) {
    throw new Error('guests must be between 1 and 4');
  }

  let price = nights * BASE_PRICE + nights * (guests - 1) * EXTRA_GUEST_PRICE;

  if (code === 'WEEKEND' && nights > 2) {
    price = price * 0.85;
  }

  return Math.round(price * 100) / 100;
}

module.exports = { bookingPrice };
