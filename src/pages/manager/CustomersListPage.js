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
  async createdUserIsVisible(customerFirstName, customerLastName, customerPostalCode) {
    const customerRow = this.page
    .getByRole('row')
    .filter({hasText: customerFirstName })
    .filter({hasText: customerLastName })
    .filter({hasText: customerPostalCode });

    await expect(customerRow).toBeVisible();
  }

  // видалення користувача
  async deleteCustomer(customerFirstName, customerLastName, customerPostalCode) {
    const customerRow = this.page
    .getByRole('row')
    .filter({hasText: customerFirstName })
    .filter({hasText: customerLastName })
    .filter({hasText: customerPostalCode });
    
    await customerRow.getByRole('button').click();
  }
  
  // переревіряємо, що видалений користувач не відображається в таблиці
  async assertCustomerNotPresent(customerFirstName, customerLastName, customerPostalCode) {
    const customerRow = this.page
    .getByRole('row')
    .filter({hasText: customerFirstName })
    .filter({hasText: customerLastName })
    .filter({hasText: customerPostalCode });
    
    await expect(customerRow).toBeHidden();
  }

  // перевіряємо, що Account Number користувача видимий
  async assertCustomerAccountNumber(customerFirstName, customerLastName, customerPostalCode){
    const customerRow = this.page
    .getByRole('row')
    .filter({hasText: customerFirstName })
    .filter({hasText: customerLastName })
    .filter({hasText: customerPostalCode });

    const accountNumber = customerRow.getByRole('cell').nth(3);
  
    await expect(accountNumber).toBeVisible();
  }

  // вводимо дані в пошукове поле
  async fillSearchField(data) {
    await this.searchField.fill(data);
  }

  // перевіряємо наявність рядка з користувачем в таблиці
  async assertCustomerPresentInTable(customerFirstName, customerLastName, customerPostalCode) {
    const customerRow = this.page
    .getByRole('row')
    .filter({hasText: customerFirstName })
    .filter({hasText: customerLastName })
    .filter({hasText: customerPostalCode });
    
    await expect(customerRow).toBeVisible();
  }

  // перевіряємо, що таблиця має один рядок
  async assertTableHasOneRow() {
    const rows = this.page.getByRole('row');
    const rowsCount = await rows.count();
    await expect(rowsCount).toBe(2); // вказано 2, бо колонки теж рахуються рядком
  }  
}
