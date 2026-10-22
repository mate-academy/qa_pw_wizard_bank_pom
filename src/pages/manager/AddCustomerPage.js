import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postalCodeInput = page.locator('input[ng-model="postCd"]');
    this.addCustomerButton = page.getByRole('form').getByRole('button', {
      name: 'Add Customer',
    });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(firstName) {
    await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostalCode(postalCode) {
    await this.postalCodeInput.fill(postalCode);
  }

  async clickAddCustomerButton() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });

    await this.addCustomerButton.click();
  }

  async assertAddCustomerFormIsVisible() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }
}