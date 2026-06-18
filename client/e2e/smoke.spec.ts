import { test, expect } from '@playwright/test';

test('homepage loads without JS errors', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', err => errors.push(err.message));

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    expect(errors, errors.join('\n')).toHaveLength(0);
    await expect(page.locator('h1').first()).toBeVisible();
});
