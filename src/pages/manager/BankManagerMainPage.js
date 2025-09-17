import { expect } from '@playwright/test';

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerLink = page.locator('button').filter({hasText:'Add Customer'})
    this.openAccountLink = page.locator('button').filter({hasText:'Open Account'})
    this.customersListLink = page.locator('button').filter({hasText:'Customers'})
  }

  async openManagerMainPage() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }

   async waitManagerMainPage() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager');
  }

  async clickCustomerListLink () {
    await this.customersListLink.click()
  }

  async clickAccountLink () {
    await this.openAccountLink.click()
  }

  async elementVisible (element) {
    await expect(element).toBeVisible()
  }

}
