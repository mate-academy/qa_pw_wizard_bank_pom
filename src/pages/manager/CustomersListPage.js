import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchField = page.getByPlaceholder('Search Customer');
  }

  // відкриття сторінки із списком всіх кастомерів
  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
  
  // перезавантаження сторінки
  async reload() {
    await this.page.reload();
  }

  // перевірка імені користувача
  async checkFirstName(customerFirstName, customerLastName, customerPostalCode) {
    const customerRow = this.page.getByRole('row', {name: `${customerFirstName} ${customerLastName} ${customerPostalCode}`});

    const firstName = customerRow.getByRole('cell').nth(0);
  
    await expect(firstName).toContainText(customerFirstName);
  }
    
  // перевірка прізвища користувача
  async checkLastName(customerFirstName, customerLastName, customerPostalCode) {
    const customerRow = this.page.getByRole('row', {name: `${customerFirstName} ${customerLastName} ${customerPostalCode}`});

    const lastName = customerRow.getByRole('cell').nth(1);
  
    await expect(lastName).toContainText(customerLastName);
  }


  // перевірка поштового індексу
  async checkPostalCode(customerFirstName, customerLastName, customerPostalCode) {
    const customerRow = this.page.getByRole('row', {name: `${customerFirstName} ${customerLastName} ${customerPostalCode}`});

    const postalCode = customerRow.getByRole('cell').nth(2);
  
    await expect(postalCode).toContainText(customerPostalCode);
  }

  // видалення користувача
  async deleteCustomer(customerFirstName, customerLastName, customerPostalCode) {
    const customerRow = this.page.getByRole('row', {name: `${customerFirstName} ${customerLastName} ${customerPostalCode} Delete`});
    
    await customerRow.getByRole('button').click();
  }
  
  // переревіряємо, що видалений користувач не відображається в таблиці
  async assertCustomerNotPresent(customerFirstName, customerLastName, customerPostalCode) {
    const customerRow = this.page.getByRole('row', {name: `${customerFirstName} ${customerLastName} ${customerPostalCode} Delete`});
    
    await expect(customerRow).toBeHidden();
  }

  // перевіряємо, що Account Number користувача видимий
  async assertCustomerAccountNumber(customerFirstName, customerLastName, customerPostalCode){
    const customerRow = this.page.getByRole('row', {name: `${customerFirstName} ${customerLastName} ${customerPostalCode}`});

    const accountNumber = customerRow.getByRole('cell').nth(3);
  
    await expect(accountNumber).toBeVisible();
  }

  // вводимо дані в пошукове поле
  async fillSearchField(data) {
    await this.searchField.fill(data);
  }

  // перевіряємо наявність рядка з користувачем в таблиці
  async assertCustomerPresentInTable(customerFirstName, customerLastName, customerPostalCode) {
    const customerRow = this.page.getByRole('row', {name: `${customerFirstName} ${customerLastName} ${customerPostalCode} Delete`});
    
    await expect(customerRow).toBeVisible();
  }

  // перевіряємо, що таблиця має один рядок
  async assertTableHasOneRow() {
    const rows = this.page.getByRole('row');
    const rowsCount = await rows.count();
    await expect(rowsCount).toBe(2); // вказано 2, бо колонки теж рахуються рядком
  }  
}
