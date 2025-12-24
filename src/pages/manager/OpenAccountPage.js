import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelectLocator = page.locator('#currency')
    this.currencyDropDown = page.getByTestId('currency');
    this.customerSelectLocator = page.locator('#userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');
  }


  async selectCurrencyDollar(){
    await this.currencySelectLocator.selectOption('Dollar')
  }


  async assertDropDownValueDollar(){
    await expect(this.currencyDropDown).toContainText('Dollar');
  }


  async selectCurrencyPound(){
    await this.currencySelectLocator.selectOption('Pound');
  }


  async assertDropDownValuePound(){
    await expect(this.currencyDropDown).toContainText('Pound');
  }



   async selectCurrencyRupee(){
    await this.currencySelectLocator.selectOption('Rupee');
  }





  async assertDropDownValueRupee(){
    await expect(this.currencyDropDown).toContainText('Rupee');
  }



   async selectCreatedCustomer() {
     const lastOptionValue = await this.customerSelectLocator
    .locator('option')
    .last()
    .getAttribute('value');

   await this.customerSelectLocator.selectOption(lastOptionValue);
  }



  async clickProcessButton(){
    await this.processButton.click();
  }


  async reloadOpenAccountPage(){
    await this.page.reload();
  }



  async clickCustomersButton(){
    await this.customersButton.click();
  }

}