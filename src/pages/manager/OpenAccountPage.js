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
  let message = '';
  this.page.once('dialog', async (dialog) => {
    message = dialog.message();
    await dialog.accept();
  });
  await this.processButton.click();
  return message;
}
}