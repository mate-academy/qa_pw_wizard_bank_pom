import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDown = page.getByTestId('currency');
    //this.currencyDollar = page.getByRole('option', {name: 'Dollar'});
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.nameCustomerDropDown = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });

    this.customersButton = page.getByRole('button', { name: 'Customers' });
    this.tableLastRow = page.locator('table.table tbody tr').last();
    //this.tableFirstRow = page.locator('table.table tbody tr').first();
    this.customarFirstName = this.tableLastRow.locator('td').nth(0);
    this.customarLastName = this.tableLastRow.locator('td').nth(1);
    this.customarPostCode = this.tableLastRow.locator('td').nth(2);
    this.customarAccountNumber = this.tableLastRow.locator('td').nth(3);
    this.customarDeleteButton = this.tableLastRow.locator('td').last();

    this.cusstomerSearchField = page.getByRole('textbox', { name: 'Search Customer' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async assertSearchCusstomerByData(dataCusstomer, locator) {
    await expect(locator).toHaveText(dataCusstomer);
  }

  async assertSearchCusstomerAllFields() {
    await expect(this.customarFirstName).toBeVisible();
    await expect(this.customarLastName).toBeVisible();
    await expect(this.customarPostCode).toBeVisible();
    await expect(this.customarAccountNumber).toBeVisible();
    await expect(this.customarDeleteButton).toBeVisible();
  }

  async fillCusstomerSearchField(dataCusstomer) {
    await this.cusstomerSearchField.click();
    await this.cusstomerSearchField.fill(dataCusstomer);
  }

  async openAccount() {
    await this.openAccountButton.click();
  }

  async clickCusstomerButon() {
    await this.customersButton.click();
  }

   async assertCustomerAccountNumber() {
    await expect(this.customarAccountNumber).not.toBeEmpty();
  }

  async openDropDownAndNameCustomer(fullNameCustomer) {
    await this.nameCustomerDropDown.click();
    await this.nameCustomerDropDown.selectOption({label: fullNameCustomer});
  }

  async clickProcessButon() {
    await this.processButton.click();
  }

  async openDropDownAndSelectCurrency(currencyName) {
    await this.currencyDropDown.click();
    await this.currencyDropDown.selectOption({ label: currencyName });
  }

  async assertCurrentCurrency(currencyName) {
    await expect(this.currencyDropDown).toHaveValue(currencyName);
  }

  
}
