

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencyField = page.getByTestId('currency');
    this.customerName = page.getByTestId('userSelect');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectDollarCurrency() {
    await this.currencyField.selectOption('Dollar');
  }

  async selectPoundCurrency() {
    await this.currencyField.selectOption('Pound');
  }

  async selectRupeeCurrency() {
    await this.currencyField.selectOption('Rupee');
  }

  async selectCustomerName(firstName, lastName) {
    await this.customerName.selectOption({label:`${firstName} ${lastName}`});
  }

  async clickProcessButton() {
    await this.processButton.click();
  }
}
