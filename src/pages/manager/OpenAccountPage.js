import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.dropdown = page.getByTestId('currency');
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customerDropdown = page.getByTestId('userSelect');
    this.accountNumberLocator = page.locator('tbody').locator('tr').last().locator('td').nth(3);
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
async selectDollar(dollar) {
    await this.dropdown.selectOption(dollar);
  }
  async assertDropdownValueIsDollar(dollar) {
    await expect(this.dropdown).toHaveValue(dollar);
  }
  async selectPound(pound) {
    await this.dropdown.selectOption(pound);
  }
  async assertDropdownValueIsPound(pound) {
    await expect(this.dropdown).toHaveValue(pound);
  }
  async selectRupee(rupee) {
    await this.dropdown.selectOption(rupee);
  }
  async assertDropdownValueIsRupee(rupee) {
    await expect(this.dropdown).toHaveValue(rupee);
  }
  async clickOpenAccountButton (){
      await this.openAccountButton.click();
    }
    async clickProcessButton (){
      await this.processButton.click();
    }
    async clickCustomersButton (){
      await this.customersButton.click();
    }
    async selectCustomer(customer) {
    await this.customerDropdown.selectOption(customer);
  }
  async assertAccountNumberIsNotEmpty(){
    await expect(this.accountNumberLocator).not.toBeEmpty();
  }
  async reload(){
    await this.page.reload();
  }
}
