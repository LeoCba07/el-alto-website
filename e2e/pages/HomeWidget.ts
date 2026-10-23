import { expect, type Locator, type Page } from '@playwright/test';
import { daysFromToday } from '../helpers';

export class HomeWidget {
    readonly page: Page;
    readonly checkIn: Locator;
    readonly checkOut: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.checkIn = page.getByLabel('Entrada');
        this.checkOut = page.getByLabel('Salida');
        this.submitButton = page.getByRole('button', { name: 'Consultar' });
    }

    async goto() {
        await this.page.goto('/');
        
        // Wait for React to hydrate; min is set to today only in the browser, once it's there -> React loaded
        // Without this line test would sometimes fail because of a race between React and Playwright
        await expect(this.checkIn).toHaveAttribute('min', daysFromToday(0));
    }

    async fillCheckIn(date: string) {
        await this.checkIn.fill(date);
    }

    async fillCheckOut(date: string) {
        await this.checkOut.fill(date);
    }

    async submitAndGetMessage(): Promise <string | null> {
        const page1Promise = this.page.waitForEvent('popup');
        await this.submitButton.click();
        const page1 = await page1Promise;

        return new URL(page1.url()).searchParams.get('text');
    }
}