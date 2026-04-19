import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }
  async buttonVisible (addCustomer, openAccount, customers) {
    const visibleAdd = this.page.getByRole('button', { name: addCustomer });
    const visibleOpen = this.page.getByRole('button', { name: openAccount });
    const visibleCustomer = this.page.getByRole('button', { name: customers });

    await expect (visibleAdd).toBeVisible();
    await expect (visibleOpen).toBeVisible();
    await expect (visibleCustomer).toBeVisible();
  }
}
