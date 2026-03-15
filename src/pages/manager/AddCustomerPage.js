import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

   async fillFirstName(firstName) {
    await this.page.getByPlaceholder('First Name').fill(firstName);
  }

  async fillLastName(lastName) {
    await this.page.getByPlaceholder('Last Name').fill(lastName);
  }

  async fillZipCode(postCode) {
    await this.page.getByPlaceholder('Post Code').fill(postCode);
  }

  async clickAddCustomerButton() {
  await this.page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
}

  async clickCustomersButton() {
  await this.page.getByRole('button', { name: 'Customers' }).click();
  }

  async clickOpenAccountButton() {
  await this.page.getByRole('button', { name: 'Open Account' }).click();
  }
}
