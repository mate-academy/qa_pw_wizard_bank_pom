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

  async reload() {
    await this.page.reload();
  }

  async fillFirstName(value) {
    await this.page.getByPlaceholder('First Name').fill(value);
  }

  async fillLastName(value) {
    await this.page.getByPlaceholder('Last Name').fill(value);
  }

  async fillPostalCode(value) {
    await this.page.getByPlaceholder('Post Code').fill(value);
  }

  async clickAddCustomerButton() {
    await this.page.getByRole('form').getByRole('button', { name: 'Add Customer' }).click();
  }

}
