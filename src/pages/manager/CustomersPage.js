import { expect } from '@playwright/test';

export class CustomersPage {
    constructor(page) {
        this.page = page;
        this.searchInput = page.getByPlaceholder('Search Customer');
        this.customersTable = page.locator('table');
        this.tableRows = page.locator('tbody tr');
    }

    async open() {
        await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
    }

    async fillSearchInput(searchText) {
        await this.searchInput.fill(searchText);
    }

    async getLastRow() {
        return this.tableRows.last();
    }

    async getRowByCustomerName(firstName, lastName) {
        return this.page.locator('tr', {
            has: this.page.locator('td', { hasText: firstName }),
        }).filter({
            has: this.page.locator('td', { hasText: lastName }),
        });
    }

    async clickDeleteButtonForCustomer(firstName, lastName) {
        const row = await this.getRowByCustomerName(firstName, lastName);
        await row.getByRole('button', { name: 'Delete' }).click();
    }

    async assertLastRowContainsFirstName(firstName) {
        const lastRow = await this.getLastRow();
        await expect(lastRow).toContainText(firstName);
    }

    async assertLastRowContainsLastName(lastName) {
        const lastRow = await this.getLastRow();
        await expect(lastRow).toContainText(lastName);
    }

    async assertLastRowContainsPostCode(postCode) {
        const lastRow = await this.getLastRow();
        await expect(lastRow).toContainText(postCode);
    }

    async assertLastRowAccountNumberIsEmpty() {
        const lastRow = await this.getLastRow();
        const accountCell = lastRow.locator('td').nth(3);
        await expect(accountCell).toBeEmpty();
    }

    async assertCustomerRowIsNotPresent(firstName, lastName) {
        const row = await this.getRowByCustomerName(firstName, lastName);
        await expect(row).toHaveCount(0);
    }

    async assertCustomerRowIsPresent(firstName, lastName) {
        const row = await this.getRowByCustomerName(firstName, lastName);
        await expect(row).toHaveCount(1);
    }

    async assertTableHasOnlyOneRow() {
        await expect(this.tableRows).toHaveCount(1);
    }

    async assertLastRowAccountNumberIsNotEmpty() {
        const lastRow = await this.getLastRow();
        const accountCell = lastRow.locator('td').nth(3);
        await expect(accountCell).not.toBeEmpty();
    }
}