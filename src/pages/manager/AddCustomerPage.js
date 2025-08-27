import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput  = page.getByPlaceholder('Last Name');
    this.postCodeInput  = page.getByPlaceholder('Post Code');
    this.addCustomerBtn = page.getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
  async fillFirstName(value) { await this.firstNameInput.fill(value); }
  async fillLastName(value)  { await this.lastNameInput.fill(value); }
  async fillPostCode(value)  { await this.postCodeInput.fill(value); }

  async clickAddCustomerAndAcceptAlert() {
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.addCustomerBtn.click(),
    ]);
    const message = dialog.message();
    await dialog.accept();
    return message;
  }

  async addCustomer({ firstName, lastName, postCode }) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostCode(postCode);
    return await this.clickAddCustomerAndAcceptAlert();
  }

  async assertCustomerAdded(message) {
    expect(message).toContain('Customer added successfully');
  }
}
