import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customerButton = page.getByRole('button', { name: 'Customers' });
    this.firstNameLocator = page.locator('tbody').locator('tr').last().locator('td').nth(0);
    this.lastNameLocator = page.locator('tbody').locator('tr').last().locator('td').nth(1);
    this.postCodeLocator = page.locator('tbody').locator('tr').last().locator('td').nth(2);
    this.accountNumberLocator = page.locator('tbody').locator('tr').last().locator('td').nth(3);
    this.deleteLastCustomerButton = page.locator('tbody').locator('tr').last().locator('td').nth(4).getByText('delete');
    this.lastCustomerRow = page.locator('tbody').locator('tr').nth(5);
    this.rows = page.locator('tbody').locator('tr');
  }
  async open() {
    await this.page.goto(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust'
    );
  }
  async fillTheFirstName (firstName){
      await this.page.getByPlaceholder('First Name').fill(firstName);
    }
    async fillTheLastName (lastName){
      await this.page.getByPlaceholder('Last Name').fill(lastName);
    }
    async fillThePostCode (postCode){
      await this.page.getByPlaceholder('Post Code').fill(postCode);
    }
    async clickAddCustomerButton (){
      await this.addCustomerButton.click();
    }
    async reload(){
      await this.page.reload();
    }
    async clickCustomerButton (){
      await this.customerButton.click();
    }
    async waitForUrl(){
      await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');
    }
    async openCustomersPage(){
      await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');
    }
    async assertFirstNameLocatorContainsText(firstName){
      await expect(this.firstNameLocator).toContainText(firstName);
    }
    async assertLastNameLocatorContainsText(lastName){
      await expect(this.lastNameLocator).toContainText(lastName);
    }
    async assertPostCodeLocatorContainsText(postCode){
      await expect(this.postCodeLocator).toContainText(postCode);
    }
     async assertAccountNumberLocatorIsEmpty(){
      await expect(this.accountNumberLocator).toBeEmpty();
    }
     async clickDeleteLastCustomerButton (){
      await this.deleteLastCustomerButton.click();
    }
    async assertlastCustomerRowIsHidden(){
      await expect(this.lastCustomerRow).toBeHidden();
    }
    async countRows(){
      return await this.rows.count();
    }
}
