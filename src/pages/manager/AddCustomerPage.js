import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page
      .getByRole('form')
      .getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.tableRows = page.locator('tr.ng-scope');
    this.accountNumberInLastRow = page.locator('tr.ng-scope').last().locator('td').nth(3);
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async addCustomerButtonClick() {
    await this.addCustomerButton.click();
  }

  async customersButtonClick() {
    await this.customersButton.click();
  }

  async addFakeCustomerFirstName() {
    this.firstName = faker.person.firstName();
    await this.firstNameInput.fill(this.firstName);
    return this.firstName;
  }

  async addFakeCustomerLastName() {
    this.lastName = faker.person.lastName();
    await this.lastNameInput.fill(this.lastName);
    return this.lastName;
  }

  async addFakeCustomerPostCode() {
    this.postCode = faker.location.zipCode();
    await this.postCodeInput.fill(this.postCode);
    return this.postCode;
  }

  async assertFakeCustomerInLastRow(firstName, lastName, postalCode) {
    await expect(this.tableRows.last()).toContainText(firstName);
    await expect(this.tableRows.last()).toContainText(lastName);
    await expect(this.tableRows.last()).toContainText(postalCode);
  }

  async assertNoAccountNumberInLastRow() {
    await expect(this.accountNumberInLastRow).toHaveText('');
  }

  async assertAccountNumberInLastRow() {
    await expect(this.accountNumberInLastRow).not.toHaveText('');
  }

  async acceptDialogWindowMessage() {
    this.page.on('dialog', (dialog) => dialog.accept());
  }
}
