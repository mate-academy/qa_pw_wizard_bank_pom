import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.managerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
    this.addCustomerButton = page.getByRole('button').nth(0);
    this.openAccountButton = page.getByRole('button').nth(1);
    this.customersButton = page.getByRole('button').nth(2);
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
    await this.page.waitForLoadState('networkidle');
  }

  async clickManagerLoginButton() {
    await this.managerLoginButton.click();
  }

  async assertddCustomerButtonAIsVisible(){
    await expect(this.addCustomerButton).toBeVisible();
  }

  async assertOpenAccountIsVisible(){
    await expect(this.openAccountButton).toBeVisible();
  }

  async assertCustomerButtonIsVisible(){
    await expect(this.customersButton).toBeVisible();
  }

}
