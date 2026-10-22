import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.homeButton = page.getByRole('button', { name: 'Home' });
    this.addCustomerTab = page.locator('button[ng-click="addCust()"]');
    this.openAccountTab = page.locator('button[ng-click="openAccount()"]');
    this.customersTab = page.locator('button[ng-click="showCust()"]');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
    await this.waitForOpened();
  }

  async waitForOpened() {
    await this.page.waitForURL(/BankingProject\/#\/manager$/);
  }

  async reload() {
    await this.page.reload();
  }

  async clickAddCustomerTab() {
    await this.addCustomerTab.click();
  }

  async clickOpenAccountTab() {
    await this.openAccountTab.click();
  }

  async clickCustomersTab() {
    await this.customersTab.click();
  }

  async clickHomeButton() {
    await this.homeButton.click();
  }

  async assertTabsAreVisible() {
    await expect(this.addCustomerTab).toBeVisible();
    await expect(this.openAccountTab).toBeVisible();
    await expect(this.customersTab).toBeVisible();
    await expect(this.addCustomerTab).toHaveText('Add Customer');
    await expect(this.openAccountTab).toHaveText('Open Account');
    await expect(this.customersTab).toHaveText('Customers');
  }
}