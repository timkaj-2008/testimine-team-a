# Requirements and Test Coverage: `inventory.js`

The table maps each requirement to its test case and Jest test name. All results below are from the reported `npx jest inventory --coverage` run.

| Requirement | Type | Test case | Test name in code | Result |
|---|---|---|---|---|
| REQ-01 | Functional | TC-01 | `REQ-01 restock adds deliveries to existing sku and adds an unknown sku` | PASS |
| REQ-02 | Functional | TC-02 | `REQ-02 restock returns a new object and leaves the original unchanged` | PASS |
| REQ-03 | Functional | TC-03 | `REQ-03 restock accepts quantity 1`; `REQ-03 restock rejects invalid quantity %s` | PASS |
| REQ-04 | Functional | TC-04 | `REQ-04 pick reduces quantity and returns a new object`; `REQ-04 pick rejects an unknown sku`; `REQ-04 pick rejects quantity greater than available stock`; `REQ-04 pick rejects zero, negative, and fractional quantities` | PASS |
| REQ-05 | Functional | TC-05 | `REQ-05 findDuplicateSkus returns each duplicated sku once and ignores unique skus`; `REQ-05 findDuplicateSkus returns an empty array when there are no duplicates` | PASS |
| REQ-06 | Performance | TC-06 | `REQ-06 findDuplicateSkus handles 20,000 items under 100 ms` | PASS — 4 ms |
| REQ-07 | Security | TC-07 | `REQ-07 restock rejects unsafe sku (%s: %s)`; `REQ-07 restock accepts valid sku (%s: %s)` | PASS |
| REQ-08 | Reliability | TC-08 | `REQ-08 failed restock leaves original stock unchanged after a prior valid delivery`; `REQ-08 failed pick leaves original stock unchanged` | PASS |

All eight requirements are covered. The run passed 27 of 27 tests. Coverage for `inventory.js` was 100% for statements, branches, functions, and lines, with no uncovered lines.


