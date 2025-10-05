import { BasePage } from '../../BasePage.js';

export class OpenAccountPage extends BasePage {
  constructor(page) {
    super(page);
    this.customerDropdown = page.locator('#userSelect');
    this.currencyDropdown = page.locator('#currency');
    this.currencySelect = this.currencyDropdown; // alias for compatibility
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  async selectCustomerByName(name) {
    await this.customerDropdown.selectOption({ label: name });
  }

  async selectCurrency(currency) {
    await this.currencyDropdown.selectOption({ label: currency });
  }

  async clickProcess() {
    const dialogPromise = this.page.waitForEvent('dialog');
    await this.processButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}
