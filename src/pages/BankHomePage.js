class BankHomePage {
  constructor(page) {
    this.page = page;
    
    this.consentButton = page.getByRole('button', { name: 'Consent' });
  }

  async handleConsent() {
   
    if (await this.consentButton.isVisible()) {
      await this.consentButton.click();
    }
  }

  async clickCustomerLogin() {
    await this.page.click('button[ng-click="customer()"]');
  }

  async clickBankManagerLogin() {
    await this.page.click('button[ng-click="manager()"]');
  }
}

