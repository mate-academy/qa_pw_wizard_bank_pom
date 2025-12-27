import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerDeleteButton = page.getByRole('button');
    this.lastTableRow = page.getByRole('row').last();
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
  async checkFirstName(firstName) {
    const cellWithFirstName = this.lastTableRow.getByRole('cell').nth(0);
  
    await expect(cellWithFirstName).toContainText(firstName);
  }
    
  // перевірка прізвища користувача
  async checkLastName(lastName) {
    const cellWithLastName = this.lastTableRow.getByRole('cell').nth(1);
  
    await expect(cellWithLastName).toContainText(lastName);
  }
  
  // перевірка поштового індексу
  async checkPostalCode(postalCode) {
    const cellWithPostalCode = this.lastTableRow.getByRole('cell').nth(2);
  
    await expect(cellWithPostalCode).toContainText(postalCode);
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
  async assertCustomerAccountNumber(){
    const accountNumber = this.lastTableRow.getByRole('cell').nth(3);

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
