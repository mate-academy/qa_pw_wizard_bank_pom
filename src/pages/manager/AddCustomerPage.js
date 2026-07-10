import { } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.postCodeField = page.getByPlaceholder('Post Code');

    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' }).last();
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    
    this.lastrowFirstName = page.locator('tbody tr').last().locator('td').first();
    this.lastrowLastName = page.locator('tbody tr').last().locator('td').nth(1);
    this.lastrowPostCode = page.locator('tbody tr').last().locator('td').nth(2);
    this.lastrowAccountNumber = page.locator('tbody tr').last().locator('td').nth(3);
  }
  async open() {
    await this.page.goto('angularJs-protractor/BankingProject/#/manager/addCust');

  }
};
