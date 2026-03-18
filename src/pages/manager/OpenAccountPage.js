import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyField = page.getByTestId('currency');
    this.customerNameField = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });

  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reloadPage(){
    await this.page.reload();
  }

  async currencyChoose(currency){
    await this.currencyField.selectOption({label: currency});
  }
  async assertCurrencyChosen(currency) {
    await expect(this.currencyField).toHaveValue(currency);
    
  }

  async customerNameChoose(customer){
    await this.customerNameField.selectOption({label: customer});
  }

  async assertCustomerChosen(customer) {
    await expect(this.customerNameField.locator('option:checked')).toHaveText(customer);

  }

  async processButtonClick(){
    await this.processButton.click();
  }

  async customersButtonClick(){
    await this.customersButton.click();
  }
}
