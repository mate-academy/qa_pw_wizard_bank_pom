import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.tableLocator = page.getByRole('table');
    this.rowCustomer = page.getByRole('row').last();
    this.rowLastCustomer = page.getByRole('row').nth(6);

    this.customerFirstName = this.rowCustomer.locator('td').nth(0);
    this.customerLastName = this.rowCustomer.locator('td').nth(1);
    this.customerPostCode = this.rowCustomer.locator('td').nth(2);
    this.customerAccountNumber = this.rowCustomer.locator('td').nth(3);

    this.deleteLastCustomerButton = page.getByRole('button', {name: 'Delete'}).last();

    this.searchField = page.getByPlaceholder('Search Customer');

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async assertCustomerFirstNameContainsText(text) {
    await expect(this.customerFirstName).toContainText(text);
  }
  async assertRowLastCustomerToBeHidden() {
    await expect(this.rowLastCustomer).toBeHidden();
  }

  async assertCustomerLastNameContainsText(text) {
    await expect(this.customerLastName).toContainText(text);
  }

  async assertCustomerPostCodeContainsText(text) {
    await expect(this.customerPostCode).toContainText(text);
  }
  
  async assertCustomerAccountNumberToBeEmpty() {
    await expect(this.customerAccountNumber).toBeEmpty();
  }

  async assertCustomerAccountNumberToBeVisible() {
    await expect(this.customerAccountNumber).toBeVisible();
  }

   async clickDeleteLastCustomerButton() {
    await this.deleteLastCustomerButton.click();
  }

  async assertLastFirstNameToBeHidden() {
    await expect(this.lastFirstName).toBeHidden();
  }

 async getLastCustomerFirstName() {
    // Находим ПОСЛЕДНЮЮ строку, берем ПЕРВУЮ ячейку (First Name)
    // .innerText() превращает локатор в обычную строку (String)
    const name =  this.customerFirstName.innerText();
    return name; // Теперь это строка "Harry", а не объект-локатор
  }

  async searchByLastCustomerFirstName(name) {
    // Вводим строку в поле поиска
    await this.searchField.fill(name);
  }

  // 3. Проверка (после поиска последняя строка становится первой)
  async assertFirstRowContainsName(expectedName) {
    const firstRow = this.tableLocator.first();
    // Проверяем, что в первой строке теперь наше имя
    await expect(firstRow).toContainText(expectedName);
    // Проверяем, что в таблице теперь только 1 результат
    // await expect(this.tableLocator).toHaveCount(1);
  }

  async assertOnlyOneRow() {
    // Проверяем, что в таблице теперь только 1 результат
    await expect(this.tableLocator).toHaveCount(1);
  }

 async getLastCustomerLastName() {
    const nameLast =  this.customerLastName.innerText();
    return nameLast;
  }

  async searchByLastCustomerLastName(nameLast) {
    await this.searchField.fill(nameLast);
  }

  // 3. Проверка (после поиска последняя строка становится первой)
  async assertFirstRowContainsName(expectedName) {
    const firstRow = this.tableLocator.first();
    await expect(firstRow).toContainText(expectedName);
  }

  async assertOnlyOneRow() {
    await expect(this.tableLocator).toHaveCount(1);
  }

 async getLastCustomerPostCode() {
    const namePostCode = this.customerPostCode.innerText();
    return namePostCode;
  }

  async searchByLastCustomerPostCode(namePostCode) {
    await this.searchField.fill(namePostCode);
  }

  // 3. Проверка (после поиска последняя строка становится первой)
  async assertFirstRowContainsName(expectedName) {
    const firstRow = this.tableLocator.first();
    await expect(firstRow).toContainText(expectedName);
  }

  async assertOnlyOneRow() {
    await expect(this.tableLocator).toHaveCount(1);
  }

  

}
