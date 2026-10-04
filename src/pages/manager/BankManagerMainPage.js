import { expect } from '@playwright/test';

export class BankManagerMainPage {
    constructor(page) {
        this.page = page;
        this.bankManagerLoginBtn = page.getByRole('button', {name: 'Bank Manager'});
        this.addCustomerBtn = page.getByRole('button', {name: 'Add Customer'});
        this.openAccountBtn = page.getByRole('button', {name: 'Open Account'});
        this.customersBtn = page.getByRole('button', {name: 'Customers'});
    }

    async open() {
        await this.page.goto('/angularJs-protractor/BankingProject/#/login');
    }

    async clickBankManagerLoginButton() {
        await this.bankManagerLoginBtn.click();
    }

    async assertAddCustomerBtnIsVisible() {
        await expect(this.addCustomerBtn).toBeVisible();
    }

    async assertOpenAccountBtnIsVisible() {
        await expect(this.openAccountBtn).toBeVisible();
    }

    async assertCustomersBtnIsVisible() {
        await expect(this.customersBtn).toBeVisible();
    }

}
