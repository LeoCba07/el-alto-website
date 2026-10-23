import { test, expect } from '@playwright/test';
import { daysFromToday, toArgentineDate } from './helpers';
import { HomeWidget } from './pages/HomeWidget';

let widget: HomeWidget;

test.beforeEach(async ({ page }) => {
    widget = new HomeWidget(page);
    await widget.goto();
});

// A1
test('opens WhatsApp with both dates and guests', async () => {
    // Define check-in and check-out dates
    const checkIn = daysFromToday(7);
    const checkOut = daysFromToday(10);

    await widget.fillCheckIn(checkIn);
    await widget.fillCheckOut(checkOut);
    const message = await widget.submitAndGetMessage();

    // Check for correct dates and order on the URL params
    expect(message).toContain(`Entrada: ${toArgentineDate(checkIn)}`);
    expect(message).toContain(`Salida: ${toArgentineDate(checkOut)}`);

    // Testing default number of people
    expect(message).toContain(`Personas: 2`);
});

// A2
test('opens WhatsApp with generic greeting when there are no dates', async () => {
    const message = await widget.submitAndGetMessage();
    expect(message).toBe(`¡Hola! Quisiera consultar disponibilidad en Complejo El Alto.`);
});

// A3
test('does not open WhatsApp and shows an error for a past check-in', async () => {
    // Listener for popups
    let popups = 0;
    widget.page.on('popup', () => {
        popups++;
    });

    // Define and fill past check-in date
    const checkIn = daysFromToday(-1);
    await widget.fillCheckIn(checkIn);

    await widget.submit();
    await expect(widget.page.getByText('La fecha de entrada no puede ser en el pasado')).toBeVisible();
    expect(popups).toBe(0);
});

// B1
test('does not open WhatsApp and shows an error for a same-day check-out', async () => {
    // Listener for popups
    let popups = 0;
    widget.page.on('popup', () => {
        popups++;
    });

    // Define and fill check-in date
    const checkIn = daysFromToday(7);
    await widget.fillCheckIn(checkIn);

    // Define and fill check-out date on same day as check-in
    const checkOut = daysFromToday(7);
    await widget.fillCheckOut(checkOut);
    
    // Check for error message and popups to be 0
    await widget.submit();
    await expect(widget.page.getByText('La salida tiene que ser posterior a la entrada')).toBeVisible();
    expect(popups).toBe(0);
});

// B2
test('does not open WhatsApp and shows an error for a check-out date before check-in', async () => {
    // Listener for popups
    let popups = 0;
    widget.page.on('popup', () => {
        popups++;
    });

    // Define and fill check-in date
    const checkIn = daysFromToday(7);
    await widget.fillCheckIn(checkIn);

    // Define and fill check-out date 2 days before check-in
    const checkOut = daysFromToday(5);
    await widget.fillCheckOut(checkOut);

    // Check for error message and popups to be 0
    await widget.submit();
    await expect(widget.page.getByText('La salida tiene que ser posterior a la entrada')).toBeVisible();
    expect(popups).toBe(0);
});

// B3
test('does not open WhatsApp and shows an error for a past check-out with no check-in', async () => {
    // Known bug issue #21: a check-out on or before today with no check-in is not rejected
    test.fail();

    // Listener for popups
    let popups = 0;
    widget.page.on('popup', () => {
        popups++;
    });

    // Define and fill in past check-out date
    const checkOut = daysFromToday(-1);
    await widget.fillCheckOut(checkOut);

    // Check for error message and popups to be 0
    await widget.submit();
    await expect(widget.page.getByText('La fecha de salida debe ser a partir de mañana')).toBeVisible();
    expect(popups).toBe(0);
});

// B4
test('does not open WhatsApp and shows an error for a check-out date set to today with no check-in', async () => {
    // Known bug issue #21: a check-out on or before today with no check-in is not rejected
    test.fail();

    // Listener for popups
    let popups = 0;
    widget.page.on('popup', () => {
        popups++;
    });

    // Define and fill in check-out date to be today
    const checkOut = daysFromToday(0);
    await widget.fillCheckOut(checkOut);

    // Check for error message and popups to be 0
    await widget.submit();
    await expect(widget.page.getByText('La fecha de salida debe ser a partir de mañana')).toBeVisible();
    expect(popups).toBe(0);
});