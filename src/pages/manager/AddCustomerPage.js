import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postCodeInput = page.locator('input[ng-model="postCd"]');
    this.submitButton = page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async addCustomer(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);

    this.page.once('dialog', async (dialog) => {
      if (!dialog.message().includes('Customer added successfully')) {
        return;
      }
      await dialog.accept();
    });

    await this.submitButton.click();
  }
}
