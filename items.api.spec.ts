import { test, expect } from '@playwright/test';

// Every test starts from the same data: POST /reset restores the two initial items
// (see server.js). Without this, a DELETE in one test would break the next test.
test.beforeEach(async ({ request }) => {
  await request.post('/reset');
});

// TC-01 · REQ-API-01 · GET /items returns the item list
test('TC-01 GET /items returns 200 and an array of 2 items', async ({ request }) => {
  const res = await request.get('/items');          // 1. send the request
  expect(res.status()).toBe(200);                    // 2. check the status code
  const body = await res.json();                     // 3. read the body as JSON
  expect(Array.isArray(body)).toBe(true);            // 4. check the shape
  expect(body.length).toBe(2);                       // 5. check the content
});

// TODO: write TC-02 … TC-10 from your test-cases.md (project guide, chapter 4).
// One test() per test case. Keep the TC-ID and REQ-ID in the comment above each test.
