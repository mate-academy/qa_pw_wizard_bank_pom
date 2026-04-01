import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
  }

  async selectCustomer(Customer){
    await this.page.getByTestId('userSelect').selectOption(Customer);
  }

  async selectCurrency(CurrencyName){
    await this.page.getByTestId('currency').selectOption(CurrencyName);
  }

  async AssertCurrency(CurrencyName){
    await expect(this.page.getByTestId('currency')).toContainText(CurrencyName);
  }
  
  async clickProcess() {
    await this.page.getByRole('button', { name: 'Process' }).click();
  }

  async clickOpenAcc() {
    await this.page.getByRole('button', { name: 'Customers' }).click();
    await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');
  }

  async reload(){
    await this.page.reload();
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
}
