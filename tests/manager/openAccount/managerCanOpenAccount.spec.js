export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.getByRole('combobox').first();
    this.currencySelect = page.getByRole('combobox').last();
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async selectCustomer(fullName) {
    await this.customerSelect.selectOption({ label: fullName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }

  async clickProcessButtonAndGetAlertText() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.processButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}