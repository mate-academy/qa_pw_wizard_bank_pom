import { } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currency = page.getByTestId('currency');
    this.customer = page.getByTestId('userSelect');
  }

  async open() {
    await this.page.goto('angularJs-protractor/BankingProject/#/manager/openAccount');
  }
}