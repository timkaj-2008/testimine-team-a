import { test, expect } from '@playwright/test';

test.describe('TodoMVC', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/todomvc');
  });

  test('adds a todo item', async ({ page }) => {
    const input = page.getByPlaceholder('What needs to be done?');
    await input.fill('Write unit tests');
    await input.press('Enter');

    await expect(page.getByTestId('todo-item')).toHaveCount(1);
  });

  // TODO: add your tests here (see the handout, chapter 5.4)
});
