import { BasePage } from '../../BasePage.js';

export class BankHomePage extends BasePage {
  constructor(page) {
    super(page);
    this.managerLoginButton = page.getByRole('button', { name: 'Bank Manager Login' });
  }

  async open() {
    await super.open('/angularJs-protractor/BankingProject/#/login');
  }

  async clickBankManagerLoginButton() {
    await this.managerLoginButton.click();
  }
}
