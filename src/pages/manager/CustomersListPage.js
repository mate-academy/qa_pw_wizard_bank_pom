import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.customerTableLast = page.locator('tbody tr').last();
    this. searchField = page.getByPlaceholder('Search Customer');
    this.userTable = page.locator('.marTop > div');
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');
  }
    async waitForOpened() {
    await this.page.waitForURL(
      'https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list',
    );
  }
    async customerTableLastContain (text){
await expect(this.customerTableLast).toContainText(text);
    }
    async searchFieldClick(){
      await this.searchField.click()
    }
    async searchFieldFill (text){
      await this.searchField.fill(text);
    }
    async userTableContain (text){
      await expect(this.userTable).toContainText(text);
    }
    async userTableHasOnlyOneRow (){
      await expect(this.userTable).toHaveCount(1);
    }
    
    
  }

