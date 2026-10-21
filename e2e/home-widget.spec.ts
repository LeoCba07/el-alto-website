import { test, expect } from '@playwright/test';
import { daysFromToday, toArgentineDate } from './helpers';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    const entrada = page.getByLabel('Entrada');

    // Wait for React to hydrate; min is set to today only in the browser, once it's there -> React loaded
    // Without this line test would sometimes fail because of a race between React and Playwright
    await expect(entrada).toHaveAttribute('min', daysFromToday(0));
});

test('opens WhatsApp with both dates and guests', async ({ page }) => {
    // Define check-in and check-out dates
    const checkIn = daysFromToday(7);
    const checkOut = daysFromToday(10);

    const entrada = page.getByLabel('Entrada');
    await entrada.fill(checkIn);
    await page.getByLabel('Salida').fill(checkOut);

    // Wait for popup event, click on consult button then save as page1
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Consultar' }).click();
    const page1 = await page1Promise;

    // Confirm it's WhatsApp
    await expect(page1).toHaveURL(/wa\.me|whatsapp/);

    // Check for correct dates and order on the URL params
    const message = new URL(page1.url()).searchParams.get('text');
    expect(message).toContain(`Entrada: ${toArgentineDate(checkIn)}`);
    expect(message).toContain(`Salida: ${toArgentineDate(checkOut)}`);

    // Testing default number of people
    expect(message).toContain(`Personas: 2`);
});

test('opens WhatsApp with generic greeting when there are no dates', async ({ page }) => {
    // Wait for popup event, click on consult button then save as page1
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Consultar' }).click();
    const page1 = await page1Promise;

    const message = new URL(page1.url()).searchParams.get('text');
    expect(message).toBe(`¡Hola! Quisiera consultar disponibilidad en Complejo El Alto.`);
});