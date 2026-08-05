import { expect } from "@playwright/test";

export class ManagerNavigation {
    navigation = {};

    constructor(page) {
        this.page = page;
        this.tabs = {
            addCustomer: page.getByRole('button', { name: 'Add Customer'}),
            openAccount: page.getByRole('button', { name: 'Open Account'}),
            customers: page.getByRole('button', { name: 'Customers'}),
        }    
    }

    async clickTab(tab) {
        await this.tabs[tab].click();
    }

    async assertNavigationIsVisible () {
        await expect(this.tabs.addCustomer).toBeVisible();
        await expect(this.tabs.openAccount).toBeVisible();
        await expect(this.tabs.customers).toBeVisible();
    }
}