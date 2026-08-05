import { expect } from '@playwright/test';

export class CustomersList {
    constructor(page) {
        this.table = page.locator('table');
        this.customers = this.table.locator('tbody tr');
        this.searchBar = page.getByPlaceholder('Search Customer');
    }

    async assertTableNotEmpty() {
        await expect(this.customers).not.toHaveCount(0);
    }

    getRow({firstName, lastName, postCode} = {}) {
        return this.customers.filter({
            hasText: `${firstName} ${lastName} ${postCode}`,
        });
    }

    async assertCustomer(customer) {
        const row = this.getRow(customer);

        await expect(row).toHaveCount(1);

        await this.#assertRow(row, customer);
    }

    async assertNewCustomer(customer) {
        await this.#assertRow(this.customers.last(), customer);
    }

    async #assertRow(
        row,
        {
            firstName,
            lastName,
            postCode,
            accountNumber,
            hasAccount,
        },
    ) {
        if (!firstName || !lastName || !postCode) {
            throw new Error('Missing required data for customer');
        }

        const cells = row.locator('td');

        await expect(cells.nth(0)).toHaveText(firstName);
        await expect(cells.nth(1)).toHaveText(lastName);
        await expect(cells.nth(2)).toHaveText(postCode);

        const accountCell = cells.nth(3);

        if (accountNumber !== undefined) {
            await expect(accountCell).toContainText(accountNumber);
        }

        if (hasAccount === true) {
            await expect(accountCell).not.toBeEmpty();
        }

        if (hasAccount === false) {
            await expect(accountCell).toBeEmpty();
        }
    }

    async deleteCustomer(customer) {
        const row = this.getRow(customer);

        await expect(row).toHaveCount(1);

        await row.getByRole('button', { name: 'Delete' }).click();
    }

    async assertCustomerNotPresent(customer) {
        await expect(this.getRow(customer)).toHaveCount(0);
    }

    async search(text = '') {
        await this.searchBar.fill(text);
    }

    async clearSearch(text) {
        await this.searchBar.fill('')
    }
}