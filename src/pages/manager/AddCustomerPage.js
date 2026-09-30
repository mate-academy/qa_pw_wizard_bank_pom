import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postalCodeInput = page.locator('input[ng-model="postCd"]');
    this.addCustomerButton = page
      .getByRole('form')
      .getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillCustomerForm(firstName, lastName, postalCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async assertCustomerFieldsAreRequired() {
    await expect(this.firstNameInput).toHaveAttribute('required', '');
    await expect(this.lastNameInput).toHaveAttribute('required', '');
    await expect(this.postalCodeInput).toHaveAttribute('required', '');
  }

  async assertEmptyFormSubmissionIsBlocked() {
    await this.addCustomerButton.click();
    await expect(this.firstNameInput).toBeFocused();
  }
}
