const { expect } = require('@playwright/test');

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyDropDownMenu = page.getByTestId('currency');
    this.buttonOpenAccount = page.getByRole('button', { name: 'Open Account' });
    this.userDropDownMenu = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
    this.costumersButton = page.getByRole('button', { name: 'Customers' });
  }

  async costumersButtonClick(){
    await this.costumersButton.click();
  }

async processButtonClick(){
  await this.processButton.click();
}

  async selectUser(text){
    await this.userDropDownMenu.selectOption(text);
  }

  async openAccBtnClick() {
    await this.buttonOpenAccount.click();
  }

  async assertSelectedCurency(text) {
    const selectedValue = await this.currencyDropDownMenu.inputValue();
    expect(selectedValue).toBe(text);
  }

  async selectCurency(text) {
    await this.currencyDropDownMenu.selectOption(text);
  }

  async open() {
    await this.page.goto('angularJs-protractor/BankingProject/#/manager/openAccount');
  }
}