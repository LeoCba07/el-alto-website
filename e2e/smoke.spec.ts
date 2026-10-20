import { test, expect } from '@playwright/test';

const pages = ['/', '/consultas-frecuentes', '/contacto', '/normas', '/precios', '/privacidad', '/servicios', '/unidades']

for (const path of pages) {
    test(`page ${path} loads`, async ({ page }) => {
        const response = await page.goto(path);

        expect(response?.status()).toBe(200);

        await expect(page.getByRole('heading').first()).toBeVisible();
    })
    
}
