export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.openAccountButton = page.getByRole('button', { name: 'Open Account' });
    this.customerDropDown = page.getByTestId('userSelect');
    this.currencyDropDown = page.getByTestId('currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async clickOpenAccount() {
    await this.openAccountButton.click();
  }

  async selectCustomer(firstName, lastName) {
    await this.customerDropDown.selectOption({ label: `${firstName} ${lastName}` });
  }

  async selectCurrency(currency) {
    await this.currencyDropDown.selectOption(currency);
  }

  async clickProcess() {
    await this.processButton.click();
  }
}