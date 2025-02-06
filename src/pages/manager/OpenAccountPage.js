const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.dropDownMenu = page.getByTestId('currency');
    // this.dropDownMenuVal = page.getByTestId('currency').inputValue();
  }

  async assertSelectedCurency(text) {
    const selectedValue = await this.dropDownMenu.inputValue();
     expect(selectedValue).toBe(text);
  }

  async selectCurency(text) {
    await this.dropDownMenu.selectOption(text);
  }

  async open() {
    await this.page.goto('angularJs-protractor/BankingProject/#/manager/openAccount');
  }
}