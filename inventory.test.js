const { restock, pick, findDuplicateSkus } = require('./inventory');

// ---- Functional tests (etapp 1a) ----
test('REQ-01 restock adds quantity to existing sku', () => {
  const stock = { 'A-1': 5 };
  expect(restock(stock, [{ sku: 'A-1', qty: 3 }])).toEqual({ 'A-1': 8 });
});

// ---- Performance test (etapp 1b) ----
// TODO: generate 20 000 items with some duplicates, measure findDuplicateSkus,
// assert it finishes under 100 ms. See project guide chapter 3.2.

// ---- Security and reliability tests (etapp 1c) ----
// TODO: REQ-07 with test.each, REQ-08 original stock unchanged after a failed restock.
