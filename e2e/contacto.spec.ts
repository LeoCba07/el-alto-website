import { test, expect } from '@playwright/test';
import { daysFromToday, toArgentineDate } from './helpers';

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
    // Dates for the stay
    const checkIn = daysFromToday(7);
    const checkOut = daysFromToday(10);
    
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
    await page.getByRole('textbox', { name: 'Fecha de entrada' }).fill(checkIn);

    // Fill date of check-out
    await page.getByRole('textbox', { name: 'Fecha de salida' }).fill(checkOut);

    // Write optional textbox
    await page.getByRole('textbox', { name: 'Consulta adicional (opcional)' }).fill('Horario de la pileta!');

    // Click continue to WhatsApp button
    const page1Promise = page.waitForEvent('popup');
    await page.getByRole('button', { name: 'Continuar a WhatsApp' }).click();
    const page1 = await page1Promise;
    
    // Verify opened page is Whatsapp and has user info
    await expect(page1).toHaveURL(/wa\.me|whatsapp/);
    await expect(page1).toHaveURL(/Leo/);

    // Verify the message has both dates, each in its place
    const message = new URL(page1.url()).searchParams.get('text');
    expect(message).toContain(`Entrada: ${toArgentineDate(checkIn)}`);
    expect(message).toContain(`Salida: ${toArgentineDate(checkOut)}`);
});

test('contact page rejects a past check-in date', async ({ page }) => {
    // Go to form and fill
    await page.goto('/contacto');

    const entrada = page.getByRole('textbox', { name: 'Fecha de entrada' });

    await page.getByRole('textbox', { name: 'Nombre' }).fill('Leo');
    await entrada.fill(daysFromToday(-1));
    await page.getByRole('textbox', { name: 'Fecha de salida' }).fill(daysFromToday(1));

    // Try to send it
    await page.getByRole('button', { name: 'Continuar a WhatsApp' }).click();

    const isTooEarly = await entrada.evaluate((el: HTMLInputElement) => el.validity.rangeUnderflow);
    expect(isTooEarly).toBe(true);
});

test('contact page rejects a same-day check-out', async ({ page }) => {
    await page.goto('/contacto');

    const salida = page.getByRole('textbox', { name: 'Fecha de salida' });   

    await page.getByRole('textbox', { name: 'Nombre' }).fill('Leo');
    await page.getByRole('textbox', { name: 'Fecha de entrada' }).fill(daysFromToday(7));
    await salida.fill(daysFromToday(7));                                      

    await page.getByRole('button', { name: 'Continuar a WhatsApp' }).click();

    const isTooEarly = await salida.evaluate((el: HTMLInputElement) => el.validity.rangeUnderflow);
    expect(isTooEarly).toBe(true);
}); 

test('contact page rejects an empty check-out date', async ({ page }) => {
    await page.goto('/contacto');

    await page.getByRole('textbox', { name: 'Nombre' }).fill('Leo');

    await page.getByRole('textbox', { name: 'Fecha de entrada' }).fill(daysFromToday(7));

    await page.getByRole('button', { name: 'Continuar a WhatsApp' }).click();

    await expect(page.getByText('Seleccioná la fecha de salida')).toBeVisible();
});

test('contact page rejects an empty check-in date', async ({ page }) => {
    await page.goto('/contacto');

    await page.getByRole('textbox', { name: 'Nombre' }).fill('Leo');

    await page.getByRole('textbox', { name: 'Fecha de salida' }).fill(daysFromToday(10));

    await page.getByRole('button', { name: 'Continuar a WhatsApp' }).click();

    await expect(page.getByText('Seleccioná la fecha de entrada')).toBeVisible();
});

test('contact page rejects an empty name field', async ({ page }) => {
    await page.goto('/contacto');

    await page.getByRole('textbox', { name: 'Fecha de entrada' }).fill(daysFromToday(7));

    await page.getByRole('textbox', { name: 'Fecha de salida' }).fill(daysFromToday(10));

    await page.getByRole('button', { name: 'Continuar a WhatsApp' }).click();

    await expect(page.getByText('Ingresá tu nombre')).toBeVisible();
});

test('contact page rejects a check-out before check-in', async ({ page }) => {
    await page.goto('/contacto');

    const salida = page.getByRole('textbox', { name: 'Fecha de salida' });   

    await page.getByRole('textbox', { name: 'Nombre' }).fill('Leo');
    await page.getByRole('textbox', { name: 'Fecha de entrada' }).fill(daysFromToday(7));
    await salida.fill(daysFromToday(5));                                      

    await page.getByRole('button', { name: 'Continuar a WhatsApp' }).click();

    const isTooEarly = await salida.evaluate((el: HTMLInputElement) => el.validity.rangeUnderflow);
    expect(isTooEarly).toBe(true);
}); 