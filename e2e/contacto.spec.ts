import { test, expect } from '@playwright/test';

function DaysFromToday(days: number): string {
    const date = new Date(); // hoy
    date.setDate(date.getDate() + days);
    return date.toISOString().slice(0, 10);
}

test('has title', async ({ page }) => {
    // Go to El Alto website
    await page.goto('/');

    // Expect a title "to contain" a substring
    await expect(page).toHaveTitle(/El Alto/);
});

test('can get to consultar form section', async ({ page }) => {
    // Go to El Alto website
    await page.goto('/');

    // Click on Consultar button
    await page.getByRole('link', {name: 'Consultar', exact: true }).click();

    await expect(page).toHaveURL(/contacto/);

    // Header of page to be Consulta Disponibilidad
    await expect(page.getByRole('heading', { name: 'Consultá disponibilidad' })).toBeVisible();
});

test('contact form fills and opens WhatsApp with the message', async ({ page }) => {
    // Go to El Alto website
    await page.goto('/');

    // Click on Consultar button
    await page.getByRole('link', {name: 'Consultar', exact: true }).click();

    await expect(page).toHaveURL(/contacto/);

    const nombre = page.getByRole('textbox', { name: 'Nombre' });

    // Name textbox is visible
    await expect(nombre).toBeVisible();

    // Fill name on textbox
    await nombre.fill('Leo');

    // Verify name is filled
    await expect(nombre).toHaveValue('Leo');

    // Fill date of check-in
    await page.getByRole('textbox', { name: 'Fecha de entrada' }).fill(DaysFromToday(7));

    // Fill date of check-out
    await page.getByRole('textbox', { name: 'Fecha de salida' }).fill(DaysFromToday(10));

    // Write optional textbox
    await page.getByRole('textbox', { name: 'Consulta adicional (opcional)' }).fill('aaa');

    // Click continue to WhatsApp button
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Continuar a WhatsApp' }).click();
    const page1 = await page1Promise;
    
    // Verify opened page is Whatsapp and has user info
    await expect(page1).toHaveURL(/wa\.me|whatsapp/);
    await expect(page1).toHaveURL(/Leo/);
});