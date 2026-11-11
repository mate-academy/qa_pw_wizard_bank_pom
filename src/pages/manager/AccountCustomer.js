import { expect } from '@playwright/test';

export class AccountCustomer {
  constructor(page) {
    this.page = page;
    
    
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/account',
    );
  }
}  