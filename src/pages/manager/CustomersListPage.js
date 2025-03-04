const { expect } = require('@playwright/test');

export class CustomersListPage {
  constructor(page) {
    this.page = page; 
    this.addCustomerBtn = page.getByRole('button', {name: 'Add Customer'});
    this.firstNameField = page.getByPlaceholder('First Name');
    this.firstName = 'User';
    this.lastNameField = page.getByPlaceholder('Last Name');
    this.lastName = 'Test';
    this.postalCodeField = page.getByPlaceholder('Post Code');
    this.postalCode = '79000';
    this.addNewCustBtn = page.getByRole('button', {name: 'Add Customer'}).last();

    this.CustomersBtn = page.getByRole('button', {name: 'Customers'});
    this.AddedCustomer = page.getByRole('row').filter({hasText: this.firstName});
    this.deleteBtn = page.getByRole('button', {name: 'Delete'}).last();
  }

 async addNewCustomer(){
    await this.addCustomerBtn.click();
    await this.firstNameField.fill(this.firstName);
    await this.lastNameField.fill(this.lastName);
    await this.postalCodeField.fill(this.postalCode);
    await this.addNewCustBtn.click();
 }

 async openCustomersPage(){
  await this.CustomersBtn.click();
 }

 async deleteAddedCustomer(){
  await this.deleteBtn.click();
  await expect(this.AddedCustomer).not.toBeVisible();
  await this.page.reload();
  await expect(this.AddedCustomer).not.toBeVisible();
 }
}