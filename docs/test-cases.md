# Test Cases: `inventory.js`

Run these cases from the repository root with `npx jest inventory`. Each row points to the test name in `inventory.test.js` so a reviewer can find it quickly.

| ID | Requirement | Type / priority | Starting state | Action | Expected result | Test name in code |
|---|---|---|---|---|---|---|
| TC-01 | REQ-01 | Functional / High | Stock contains `A-1: 5`. | Restock `A-1` by 3 and new SKU `B-2` by 4. | The result is `{ 'A-1': 8, 'B-2': 4 }`. | `REQ-01 restock adds deliveries to existing sku and adds an unknown sku` |
| TC-02 | REQ-02 | Functional / High | Stock contains `A-1: 5`. | Restock `A-1` by 2. | A new object contains 7; the original still contains 5. | `REQ-02 restock returns a new object and leaves the original unchanged` |
| TC-03 | REQ-03 | Functional / High | Stock is empty. | Restock with quantity 1, then try 0, -1, 2.5, `NaN`, and `'2'`. | Quantity 1 succeeds. Each invalid quantity throws an error. | `REQ-03 restock accepts quantity 1`; `REQ-03 restock rejects invalid quantity %s` |
| TC-04 | REQ-04 | Functional / High | Stock contains `A-1: 5`. | Pick 2; then try an unknown SKU, quantity 6, and quantities 0, -1, and 1.5. | A successful pick returns a new object with 3. Invalid requests throw, and the original stock remains unchanged. | `REQ-04 pick reduces quantity and returns a new object`; `REQ-04 pick rejects an unknown sku`; `REQ-04 pick rejects quantity greater than available stock`; `REQ-04 pick rejects zero, negative, and fractional quantities` |
| TC-05 | REQ-05 | Functional / High | One list has repeated and unique SKUs; another has only unique SKUs. | Call `findDuplicateSkus` on each list. | Each duplicate is returned once; the all-unique list returns `[]`. | `REQ-05 findDuplicateSkus returns each duplicated sku once and ignores unique skus`; `REQ-05 findDuplicateSkus returns an empty array when there are no duplicates` |
| TC-06 | REQ-06 | Performance / High | List contains 20,000 items, with repeated SKU values. | Measure one call to `findDuplicateSkus`. | The call takes less than 100 ms. | `REQ-06 findDuplicateSkus handles 20,000 items under 100 ms` |
| TC-07 | REQ-07 | Security / High | Stock is empty. | Try injection-like strings, a 21-character SKU, whitespace, a number, an empty string, and an underscore. Also try valid 1- and 20-character SKUs. | Invalid values throw `invalid sku`; valid boundary values are accepted. | `REQ-07 restock rejects unsafe sku (%s: %s)`; `REQ-07 restock accepts valid sku (%s: %s)` |
| TC-08 | REQ-08 | Reliability / High | Stock contains `A-1: 5`. | Restock once with a valid delivery followed by a zero-quantity delivery; also try picking more than is available. | Each invalid operation throws, and the original stock remains unchanged. | `REQ-08 failed restock leaves original stock unchanged after a prior valid delivery`; `REQ-08 failed pick leaves original stock unchanged` |

For TC-06, the reported run processed 20,000 items in 4 ms. Run the case again in the review environment if you need to confirm its timing there.


