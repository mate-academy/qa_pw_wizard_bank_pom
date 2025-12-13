import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

  async waitForLoading(){
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager');
  }

  async assertButtonIsVisible(button = 'Add Customer'){
    await expect(this.page.getByRole('button', { name: button })).toBeVisible();
  }
}
