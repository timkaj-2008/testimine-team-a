# Testing practice project

Practice repository for the course *Tarkvarasüsteemide testimine* (Software Systems Testing).
Unit tests with **Jest**, end-to-end tests with **Playwright**.

## Getting started (GitHub Codespaces)

1. Click **Use this template → Create a new repository** (your own copy).
2. In your repository click **Code → Codespaces → Create codespace on main**.
3. Wait until the terminal shows that `npm install` and the browser download have finished (1–2 min).
4. Run `npm test` — you should see green tests.

Do **not** run `npm install -g npm@...` even if npm suggests it — it breaks the Codespace.

## Setting up from scratch (empty repository)

Only if you did not use the template, or the template setup failed:

```bash
npm init -y                        # create package.json
npm install --save-dev jest        # install Jest
npm pkg set scripts.test=jest      # make "npm test" run Jest
npm test                           # run the tests
```

Test files must end with `.test.js` (e.g. `cart.test.js`), otherwise Jest will not find them.

## Commands

| Command | What it does |
|---|---|
| `npm test` | run all Jest unit tests |
| `npm run test:watch` | re-run Jest on every file save |
| `npm run coverage` | Jest with a code coverage report |
| `npx jest cart` | run only test files whose name contains `cart` |
| `npm run e2e` | run Playwright tests (headless Chromium) |
| `npm run e2e:ui` | Playwright UI mode — opens in a new browser tab |
| `npm run report` | open the last Playwright HTML report (with traces) |

## Files

- `demo.test.js`, `mock.test.js` — lecture demos, safe to delete
- `password.js` / `password.test.js` — unit-test practice 1 (contains one intentional bug)
- `cart.js` / `cart.test.js` — unit-test practice 2 (contains one intentional bug)
- `tests/todo.spec.ts` — your Playwright tests go here
- `playwright.config.ts` — Playwright settings (Chromium only, trace always on)

## Rules that save time

- Code and tests live in separate files: `cart.js` and `cart.test.js`. Jest does not measure coverage for test files themselves.
- If VS Code adds `require('expect')` or `require('picomatch')` to the top of a test file, delete that line. `test` and `expect` work in Jest without importing.
- `toThrow` needs an arrow function: `expect(() => f('abc')).toThrow()`.

## If something breaks

| Error | Cause | Fix |
|---|---|---|
| `No tests found` | file name does not end with `.test.js` | rename the file |
| `Error: no test specified` | default test script in `package.json` | `npm pkg set scripts.test=jest` |
| `Cannot find module './cart'` | wrong path or file missing | check the file is in the same folder |
| `regex.exec is not a function` | VS Code added `require('picomatch')` | delete that line |
| `Cannot find module 'y18n'`, `ETARGET`, `string-width-cjs` | `node_modules` or npm is broken | see below |
| Playwright: `Executable doesn't exist` | browsers not installed | `npx playwright install chromium` |
| Ports 8080 / 9323 do not open | port not forwarded | VS Code → **PORTS** tab → globe icon |

**Broken `node_modules`:**

```bash
rm -rf node_modules package-lock.json
npm install
```

**npm itself throws errors** — bypass it with a fresh copy:

```bash
npx npm@latest install
npx npm@latest test
```

If that does not help, delete the Codespace (**Codespaces → ⋯ → Delete**) and create a new one. It is faster than debugging.

## Running locally instead of Codespaces

Requires Node.js 20+. Then:

```bash
npm install
npx playwright install chromium
npm test
```
