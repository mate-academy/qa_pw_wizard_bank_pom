import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.dropdown = page.getByTestId('currency');
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customerDropdown = page.getByTestId('userSelect');
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
    async selectCustomer(customer) {
    await this.customerDropdown.selectOption(customer);
  }
}
