import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.tableRows = page.locator('tbody tr');

  
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

async fillPostCode(postCode) {
  await this.postCodeInput.fill(postCode);
}

async clickAddCustomerButton() {
  await this.addCustomerButton.click();
}

async reload() {
  await this.page.reload();
  }

async clickCustomersButton() {
  await this.customersButton.click();
}

async assertLastCustomerData(firstName, lastName, postCode) {
    // Вибираємо останній рядок зі списку тих, що ми знайшли
  const lastRow = this.tableRows.last(); 
  const cells = lastRow.locator('td');

    // Перевіряємо дані за індексами, які ми вирахували за скріншотом
  await expect(cells.nth(0)).toHaveText(firstName); 
  await expect(cells.nth(1)).toHaveText(lastName); 
  await expect(cells.nth(2)).toHaveText(postCode); 
  await expect(cells.nth(3)).toBeEmpty();  
  }

async assertLastCustomerHasAccount() {
  const lastRow = this.tableRows.last();
  const cells = lastRow.locator('td');
  const accountNumberCell = cells.nth(3);
  await expect(accountNumberCell).not.toBeEmpty();
}
}


