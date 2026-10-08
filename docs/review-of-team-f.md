# Review of Team F

Reviewed PR: [Test suite and documents for inventory.js – Team F](https://github.com/ttvXdlex/Testimine/pull/1)  
Repository: [ttvXdlex/Testimine](https://github.com/ttvXdlex/Testimine)  
Review date: 2026-10-08

I checked the files in the pull request against checklist 6.2, ran the submitted inventory tests, and followed the REQ-02 test procedure independently. The PR is still open. These checklist results describe the current PR state.

## Checklist 6.2

| Code | Checklist item | Status | Evidence |
|---|---|---|---|
| K1 | Test names start with a REQ-ID and include a type comment. | OK | The inventory tests use REQ-IDs in their names and label the test type. |
| K2 | Tests cover functional, performance, security, and regression/reliability behavior. | OK | All four types are represented. See review comment 1 for an uncovered valid-SKU edge case. |
| K3 | REQ-02 and REQ-04 check that the original object stays unchanged. | OK | The tests check the returned object and the original stock for both operations. |
| K4 | REQ-03 covers quantities 0, 1, negative, and non-integer. | OK | The tests cover these boundaries; they also cover `NaN` and a string. |
| K5 | The performance test measures and compares elapsed time; duplicate detection is optimized. | OK | REQ-06 checks the 20,000-item case against the 100 ms limit. The implementation uses `Set`; the submitted run reports 4 ms. |
| K6 | At least four malicious SKU values are tested and rejected. | OK | The suite tests more than four invalid values, including HTML-like and SQL-like strings, and expects errors. |
| K7 | `npm run coverage` shows no uncovered line numbers. | OK | The submitted coverage report shows 100% statements, branches, functions, and lines, with the uncovered-lines column empty. |
| P1 | The plan states scope, exclusions, and reasons. | OK | `docs/test-plan.md` covers REQ-01–REQ-08 and explains that database, concurrent requests, and HTTP API are excluded because they are outside the supplied module. The implementation commit reference needs correction; see comment 2. |
| P2 | At least three risks include likelihood, impact, and a mitigating test. | EBASELGE | The plan lists five risks with likelihood, impact, and test-based mitigations, but the immutability risk incorrectly groups M5 with mutation defects; see comment 3. |
| P3 | Exit criteria are measurable. | OK | Criteria include coverage percentages, pass status, the REQ-06 time limit, mutation outcomes, and unresolved high-severity comments. |
| T1 | Each test case has a REQ-ID and exact test-name reference. | OK | `docs/test-cases.md` maps its cases to requirements and test names. |
| T2 | Expected results are concrete and independently decidable. | OK | The cases specify outcomes that can be checked from assertions or errors. |
| T3 | The reviewer ran the tests and independently followed one test-case procedure. | OK | All 27 tests passed in the submitted run. I independently followed the REQ-02 procedure and confirmed the returned stock is `{ A1: 7 }`, is a new object, and leaves the input `{ A1: 4 }` unchanged. |
| J1 | The traceability matrix covers all eight requirements and links tests. | OK | `docs/traceability.md` lists REQ-01 through REQ-08 and links each to tests. |
| J2 | Any uncovered requirement is explained as a risk or scope exclusion. | OK | The matrix records tests for all eight requirements; no requirement is marked uncovered. The report's D-02 classification should be clarified; see comment 5. |
| G1 | The PR description explains how to run tests and reports test counts, coverage, and timing. | PUUDUB | GitHub currently shows “No description provided.” Add the run command and measured results; see comment 4. |

## Review comments to post

1. **K2 — Käsitlege kehtivat SKU-d `constructor`.** **Asukoht:** `inventory.test.js`, rida 19 (või esimese REQ-01 testi ploki rida 7). `constructor` vastab lubatud SKU mustrile, kuid objekti päritud omadust käsitletakse laoseisuna. Kontrollisin: `restock({}, [{ sku: 'constructor', qty: 1 }])` ei tagasta kogust `1` ning `pick({}, 'constructor', 1)` ei anna teadet tundmatu SKU kohta. Kontrollige ainult objekti enda omadusi (või kasutage prototüübita laoseisuobjekti) ja lisage REQ-01/REQ-04 testid.

2. **P1 — Parandage testiplaanis viidatud koodiversiooni commit.** **Asukoht:** `docs/test-plan.md`, rida 3. Plaanis on kontrollitud versioonina viidatud commit `b950410edca0e36b40fd6c182d30c393067b5ada`, kuid see lisab ainult faili `docs/a` ega viita laomooduli teostusele. Palun lisage commit'i link, mis sisaldab üle vaadatud `inventory.js`-i ja teste, et testimise alus oleks kontrollitav.

3. **P2 — Parandage M5 riski ja leevenduse kirjeldus.** **Asukoht:** `docs/test-plan.md`, rida 22. Plaan seostab mutatsiooni M5 algse laoseisuobjekti muutmisega. M5 asendab koguste liitmise väärtusega `d.qty`, seega on tegemist koguste summeerimise veaga. Palun kirjeldage see risk eraldi ja viidake REQ-01 testile, mis kontrollib tarnete liitmist olemasolevale laoseisule.

4. **G1 — Lisage PR-ile kirjeldus.** **Asukoht:** PR-i vahekaart **Conversation**, ülaosas olev kirjelduse väli (see ei ole koodirea kommentaar). PR-il puudub praegu kirjeldus. Lisage kontrollnimekirja järgi testide käivitamise käsk, testide arv, katvuse näitajad ja REQ-06 mõõdetud aeg.

5. **J2 — Täpsustage testiaruande kirjet D-02.** **Asukoht:** `docs/test-report.md`, rida 28. D-02 on jaotises „Leitud vead“, kuid kirjeldab muutmise riski ja selle olek on „Covered & Verified“. Palun kirjeldage konkreetne leitud viga koos tõenditega või tõstke kirje riskide jaotisse, et aruanne eristaks tuvastatud viga riskist.

6. **P1 — Uuendage plaanis osalejate ja ülevaatuse paaride andmeid.** **Asukoht:** `docs/test-plan.md`, read 45–47. See PR kuulub Team F-ile, kuid plaanis on kirjas, et töö tegi Team A ja üle vaatab Team B. Palun parandage see osa Team F-i ja talle määratud ülevaatuse paari järgi.

7. **T3 — Viige testiaruande ülevaatuse tulemused PR-i ajalooga kooskõlla.** **Asukoht:** `docs/test-report.md`, read 30–33. Aruande järgi saadi kuus märkust ja kõik lahendati, kuid PR-i lehel pole praegu ülevaatust ega ülevaatusmärkusi näha. Palun lisage viide ülevaatuse arutelule või parandage aruannet vastavalt PR-i tegelikule ajaloole.

## Test execution

The submitted test run reports 27/27 passing tests. Coverage is reported as 100% for statements, branches, functions, and lines, with no uncovered lines; REQ-06 is reported at 4 ms. I independently followed the REQ-02 case against the submitted module and confirmed its expected result. The `constructor` edge case described above is not covered and fails the functional expectation.

## Summary

The submission includes the requested test suite and planning, case, traceability, and report documents. The checklist is mostly satisfied. Please address the seven comments above before treating the review and documentation as complete.

## What went well

1. The `Set` implementation brings duplicate detection within the 100 ms requirement; the report records 3.8 ms.
2. The tests cover the required quantity boundaries, unsafe SKU values, object immutability, and error paths.
3. The test cases and traceability matrix link REQ-01 through REQ-08 to the corresponding tests.
