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
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
  async fillFirstName(v) { await this.firstNameInput.fill(v); }
  async fillLastName(v)  { await this.lastNameInput.fill(v); }
  async fillPostCode(v)  { await this.postCodeInput.fill(v); }

  async clickAddAndAcceptAlert() {
    const [dialog] = await Promise.all([
      this.page.waitForEvent('dialog'),
      this.addCustomerBtn.click(),
    ]);
    const msg = dialog.message();
    await dialog.accept();
    return msg;
  }

  async addCustomer({ firstName, lastName, postCode }) {
    await this.fillFirstName(firstName);
    await this.fillLastName(lastName);
    await this.fillPostCode(postCode);
    return await this.clickAddAndAcceptAlert();
  }

  async assertCustomerAdded(msg) {
    expect(msg).toContain('Customer added successfully');
  }
}
