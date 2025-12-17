import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.getByPlaceholder('Search Customer');
    this.tableRows = page.locator('tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async deleteCustomerByName(name) {
    await this.searchBox.fill(name);
    await this.page.getByRole('row', { name: name })
            .getByRole('button', { name: 'Delete' })
            .click();
  }
  
  async assertCustomerIsNotInList(name) {
    await this.searchBox.fill(name); 
    await expect(this.page.getByRole('row', { name: name })).not.toBeVisible();
  }

  async fillFirstName(name) {
    await this.searchBox.fill(name); 
  }

  async fillLastName(name) {
    await this.searchBox.fill(name); 
  }
  
  async fillPostCode(number) {
    await this.searchBox.fill(number); 
  }

  async assertCustomerDataInRow(firstName, lastName, postCode) {
    const cells = this.tableRows.locator('td');

    // 2. Перевіряємо кожну колонку
    await expect(cells.nth(0)).toHaveText(firstName); 
    await expect(cells.nth(1)).toHaveText(lastName); 
    await expect(cells.nth(2)).toHaveText(postCode); 
    
    // 3. Рахунок має бути пустим
    await expect(cells.nth(3)).toBeEmpty();
  }

  async assertNumberOfRows(expectedCount) {
    await expect(this.tableRows).toHaveCount(expectedCount);
  }
  
  }
