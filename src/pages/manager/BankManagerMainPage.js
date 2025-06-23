import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');
  }
  async waitForOpened() {
    await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');
}
async addCustomerButtonVisible(){
  await expect(this.addCustomerButton).toBeVisible();
}
async openAccountButtonVisible(){
await expect(this.openAccountButton).toBeVisible();
}
async customersButtonVisible(){
await expect(this.customersButton).toBeVisible();
}
async customersButtonClick (){
  await this.customersButton.click();
}
async processButtonClick(){
  await this.processButton.click();
}
}
