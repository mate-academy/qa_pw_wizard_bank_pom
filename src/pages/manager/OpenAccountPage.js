import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    
    this.processButton = page.getByRole('button', {name: 'Process'});
    this.customersButton = page. getByRole('button', {name: 'Customers'});
    
    this.customerSelect = page.locator('select[ng-model="custId"]');
    this.currencySelect = page.locator('select[ng-model="currency"]');
  
  }
  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
   async waitForLoading() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/openAccount',
    ); 
  }
  
async selectCustomerName(customerName) {
    await this.customerSelect.selectOption({ label: customerName });
  }
    
    

  async selectCurrency(currency) {
  await this.currencySelect.selectOption({ label: currency });
  }
  async checkSelectedCurrency(currency) {
  await expect(this.currencySelect).toContainText(currency);}


  async clickProcessButton() {
    await this.processButton.click();
  }
  async  clickOpenAccountsButton() {
  await this.openAccountButton.click();
}

async  clickCustomersButton() {
  await this.customersButton.click();
  }
}

