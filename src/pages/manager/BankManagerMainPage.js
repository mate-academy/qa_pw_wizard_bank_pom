import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.buttonAddCustomer = page.getByRole('button', { name: 'Add Customer' });
    this.buttonOpenAccount = page.getByRole('button', { name: 'Open Account' });
    this.buttonCustomers = page.getByRole('button', { name: 'Customers' });
    //this.assertButtonsMainPage = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async assertButtonAddCustomer(){
    await expect (this.buttonAddCustomer).toBeVisible();
  }

  async assertButtonOpenAccount(){
    await expect (this.buttonOpenAccount).toBeVisible();
  }

  async assertButtonCustomers(){
    await expect (this.buttonCustomers).toBeVisible();
  }

  
}

/* async assertButtons() {
    const buttons = this.assertButtonsMainPage.getByRole('button');
  
    await expect(buttons.nth(1)).toBeVisible();
    await expect(buttons.nth(1)).toHaveText('Add Customer');

    await expect(buttons.nth(2)).toBeVisible();
    await expect(buttons.nth(2)).toHaveText('Open Account');

    await expect(buttons.nth(3)).toBeVisible();
    await expect(buttons.nth(3)).toHaveText('Customers');
  }*/