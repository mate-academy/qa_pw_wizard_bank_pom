import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInputField = page.getByPlaceholder('First Name');
    this.secondNameInputField = page.getByPlaceholder('Last Name');
    this.postalCodeInputField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customerButton = page.getByRole('button', { name: 'Customers' });
    this.firstNameRow = page.getByRole('row').nth(0);
    this.lastRow = page.getByRole('row').last();

  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(firstName){
    await this.firstNameInputField.fill(firstName);
  }

  async fillSecondName(secondName){
    await this.secondNameInputField.fill(secondName);
  }

  async fillPostalCode(postalCode){
    await this.postalCodeInputField.fill(postalCode);
  }

  async clickAddCustomersButton(){
    await this.addCustomerButton.click();
  }

  async reloadPage() {
    await this.page.reload();
  }

  async awaitForLoadURL() {
    await this.page.awaitForLoadURL();
  }

  async clickCustomerButton(){
    await this.customerButton.click();
  }

  async assertSelectCustomerDropdownContainsValue(value) {
    const currentOptionText = this.customerDropDown;
    await expect(currentOptionText).toHaveValue(value);
  }

  async assertFirstNameInLastRow(firstname) {
    await expect(this.lastRow.locator('td').nth(0)).toHaveText(firstname);
  }
  
  async assertLastNameInLastRow(secondname) {
    await expect(this.lastRow.locator('td').nth(1)).toHaveText(secondname);
  }
  
  async assertPostalCodeInLastRow(postalcode) {
    await expect(this.lastRow.locator('td').nth(2)).toHaveText(postalcode);
  }
  
  async assertNoAccountInLastRow() {
    await expect(this.lastRow.locator('td').nth(3)).toBeEmpty();
  }


}