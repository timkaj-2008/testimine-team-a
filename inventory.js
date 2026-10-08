// Warehouse inventory module.

// Functional rules:
//  - restock(stock, deliveries): adds delivered quantities to stock.
//      stock      = { sku: quantity, ... }
//      deliveries = [ { sku, qty }, ... ]
//      Returns a NEW object; the original stock is not modified.
//      qty must be a positive whole number, otherwise throws an Error.
//      Unknown sku in deliveries is added to stock.
//  - pick(stock, sku, qty): removes qty of sku from stock.
//      Returns a NEW object. Throws if sku is unknown or qty > available.
//  - findDuplicateSkus(items): returns an array of sku values that appear
//      more than once in items (array of { sku, ... }). Each duplicate once.
//
// Non-functional requirement (performance):
//  - findDuplicateSkus must handle 20 000 items in under 100 ms.
//
// Security requirement:
//  - sku must be a string of 1–20 characters: letters, digits, dash only.
//    Anything else → throws an Error (prevents injection into downstream systems).

const SKU_PATTERN = /^[A-Za-z0-9-]{1,20}(?![\s\S])/;

function assertSku(sku) {
  if (typeof sku !== 'string' || !SKU_PATTERN.test(sku)) {
    throw new Error('invalid sku');
  }
}

function restock(stock, deliveries) {
  const result = { ...stock };
  for (const d of deliveries) {
    assertSku(d.sku);
    if (!Number.isInteger(d.qty) || d.qty <= 0) {
      throw new Error('qty must be a positive whole number');
    }
    result[d.sku] = (result[d.sku] || 0) + d.qty;
  }
  return result;
}

function pick(stock, sku, qty) {
  assertSku(sku);
  if (!(sku in stock)) {
    throw new Error('unknown sku');
  }
  if (!Number.isInteger(qty) || qty <= 0 || qty > stock[sku]) {
    throw new Error('not enough stock');
  }
  const result = { ...stock };
  result[sku] = stock[sku] - qty;
  return result;
}

function findDuplicateSkus(items) {
  const seen = new Set();
  const duplicates = new Set();
  for (const item of items) {
    if (seen.has(item.sku)) {
      duplicates.add(item.sku);
    }
    seen.add(item.sku);
  }
  return [...duplicates];
}

module.exports = { restock, pick, findDuplicateSkus };



