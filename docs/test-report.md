# Test Completion Report: `inventory.js`

## Results

We ran `npx jest inventory --coverage`. All 27 tests passed. Jest reported 100% statement, branch, function, and line coverage for `inventory.js`, with no uncovered lines. The REQ-06 run processed 20,000 items in 4 ms, below the 100 ms limit.

In one full `npm test` run, the inventory suite passed, but `password.test.js` failed on the exact-eight-characters case. That is a separate exercise, and `password.js` labels its bug as intentional. The inventory suite passes on its own.

## Changes made

| ID | Finding | Status |
|---|---|---|
| D-01 | `findDuplicateSkus` compared items pair by pair and did not scale to large lists. | Replaced with a `Set`-based implementation. The reported 20,000-item run took 4 ms. |
| D-02 | The SKU regular expression could accept a valid-looking value followed by a final newline. | Tightened the check and added a regression case; the invalid SKU is rejected. |

## Mutation checks

We applied the mutations one at a time and restored `inventory.js` after each run. M1, M2, M3, M5, and M6 were caught by their related tests. M4 made no code change; all 27 inventory tests passed in that control run. The individual test names and outcomes are listed in `docs/test-plan.md`.

## Review

Peer review has not happened yet. Fill in the number of comments received, resolved, and disputed after Team E reviews this pull request. Record the main review finding here as well.

## Remaining checks

- Complete the peer review and resolve or answer each comment.
- Review Team B's pull request and record the findings in `docs/review-of-team-b.md`.
- The 4 ms performance result is from one run and may vary by machine; the requirement remains under 100 ms.

## Recommendation

The inventory tests pass and the reported performance and coverage meet the plan's targets. Finish the peer review before merging.
