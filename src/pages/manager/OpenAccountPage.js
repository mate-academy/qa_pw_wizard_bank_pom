export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.userSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async open() {
    await this.page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async selectCustomer(name) {
    await this.userSelect.selectOption({ label: name });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async clickProcessButton() {
    this.page.once('dialog', async (dialog) => {
      await dialog.accept();
    });
    await this.processButton.click();
  }
}