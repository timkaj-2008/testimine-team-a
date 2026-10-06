# Test Plan: `inventory.js`

## What we are testing

This plan covers `inventory.js` and its Jest tests, `inventory.test.js`. In this repository both files are in the root directory, although the assignment guide shows them under `loeng-1.5-1.6/`.

We will check all eight requirements, REQ-01 through REQ-08. That includes restocking and picking stock, duplicate SKU detection, input validation, and the requirement to process 20,000 items in under 100 ms.

We are not testing a database, concurrent requests, or an HTTP API. Those features are not part of the supplied module.

## Main risks

| Risk | Likelihood | Impact | How we check it |
|---|---|---|---|
| Duplicate detection becomes too slow as the list grows | High | High | REQ-06 measures a list of 20,000 items. The implementation uses `Set`. |
| A stock operation changes the object passed in by the caller | Medium | High | REQ-02 checks the restock result and original object; REQ-08 checks that a failed operation leaves stock alone. |
| Invalid quantities are accepted at the boundary | Medium | High | REQ-03 checks zero, one, negative, fractional, `NaN`, and string values. |
| An unsafe SKU gets through validation | Medium | High | REQ-07 checks malformed, overlength, and injection-like values, as well as valid boundary values. |
| A change to `pick` breaks an error case | Medium | Medium | REQ-04 checks a successful pick, an unknown SKU, insufficient stock, and invalid quantities. |

## How we test

These are unit tests written from the requirements. We also used small code mutations to check whether the tests catch the defects they are meant to catch. Jest is the test runner.

## When the work is ready

- Every requirement from REQ-01 through REQ-08 has a test.
- All inventory tests pass.
- Branch coverage is at least 90%, with no uncovered executable lines.
- REQ-06 finishes in under 100 ms for 20,000 items.
- M1, M2, M3, M5, and M6 are caught by tests. M4 makes no code change, so it is recorded as a no-change control.
- No high-severity review comments are left open before merge.

## Mutation check results

We applied each mutation to `inventory.js` separately, ran the relevant Jest test, and restored the original implementation afterward. For M4 we left the code unchanged and ran the complete inventory suite.

| Mutation | Test that caught it | Result |
|---|---|---|
| M1: change the restock check from `qty <= 0` to `qty < 0` | `REQ-03 restock rejects invalid quantity 0` | The test failed because quantity 0 no longer threw. Caught. |
| M2: update the original object in `pick` and return it | `REQ-04 pick reduces quantity and returns a new object` | The test failed because `pick` returned the original object. Caught. |
| M3: raise the SKU length limit from 20 to 25 | `REQ-07 restock rejects unsafe sku (AAAAAAAAAAAAAAAAAAAAA: sku too long)` | The test failed because a 21-character SKU was accepted. Caught. |
| M4: make no code change | Full inventory suite | All 27 tests passed. No mutation was made; this is the control case. |
| M5: replace the accumulated restock quantity with `d.qty` | `REQ-01 restock adds deliveries to existing sku and adds an unknown sku` | The test failed because the existing quantity was not added to. Caught. |
| M6: return immediately from `assertSku` | `REQ-07 restock rejects unsafe sku (%s: %s)` | All eight invalid-SKU cases failed as expected. Caught. |

## Test environment

Run the inventory tests from the repository root with `npx jest inventory`. To check coverage, use `npx jest inventory --coverage`. The reported run passed all 27 tests and showed 100% statement, branch, function, and line coverage. REQ-06 took 4 ms in that run. The exact Node.js version was not recorded.

## People and review

Team A prepares the tests and documents. Team E reviews Team A's pull request. Team A reviews Team B's pull request.
