const { expect } = require('@playwright/test');

export class BankManagerMainPage {
  constructor(page) {
    this.page = page; 
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager');
  }
  
  async waitingForURL () {
    await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');
  }

  async getButtonByName (buttonName) {
    return this.page.getByRole('button', { name: `${buttonName}` })
  }

  async assertButtonIsVisible (buttonName) {
    const button = await this.getButtonByName(buttonName);
    await expect(button).toBeVisible();   
  }

  
}