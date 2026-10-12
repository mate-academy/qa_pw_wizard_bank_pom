import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currDropDown = page.locator('#currency');
    this.userDropDown = page.locator('#userSelect');
    this.proccesButton = page.getByRole('button', { name : 'Process'});
    this.customersButton = page.getByRole('button', {name : 'Customers'});
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
}
