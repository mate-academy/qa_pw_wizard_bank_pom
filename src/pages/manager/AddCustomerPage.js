const { expect } = require('@playwright/test');
import { faker } from '@faker-js/faker';

export class AddCustomerPage {
  constructor(page) {
    this.page = page; 
    this.FirstNameField = page.getByPlaceholder('First Name');
    this.firstName = 'Test';
    this.LastNameField = page.getByPlaceholder('Last Name');
    this.lastName = 'User';
    this.PostalCodeField = page.getByPlaceholder('Post Code');
    this.postCode = '79000'; 
    this.AddCustomerBtn = page.getByRole('button', {name: 'Add Customer'}).last();

    this.CustomersTab = page.getByRole('button', {name: 'Customers'});
    this.newFirstName = page.getByRole('row').filter({hasText: this.firstName});
    this.newLastName = page.getByRole('row').filter({hasText: this.lastName});
    this.newPostalCode = page.getByRole('row').filter({hasText: this.postCode});
    this.newAccountNumber = page.getByRole('row').last().getByRole('cell').nth(3);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async validRegister(){
    await this.FirstNameField.fill(this.firstName);
    await this.LastNameField.fill(this.lastName);
    await this.PostalCodeField.fill(this.postCode);
    await this.AddCustomerBtn.click();
  }

  async openCustomersList(){
    await this.CustomersTab.click();
  }

  async checkUserData(){
    await expect(this.newFirstName).toBeVisible();
    await expect(this.newLastName).toBeVisible();
    await expect(this.newPostalCode).toBeVisible();
    await expect(this.newAccountNumber).toHaveText('');
  }
}