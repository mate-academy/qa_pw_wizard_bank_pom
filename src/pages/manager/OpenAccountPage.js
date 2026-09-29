import { expect } from "@playwright/test";

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currentCurrency = page.getByTestId("currency");
    this.currentAccount = page.getByTestId("userSelect");
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/openAccount",
    );
  }

  async chooseCurrentCurrency(currency) {
    const chooseCurrency = this.currentCurrency;
    await chooseCurrency.selectOption(currency);
  }

  async whatIsCurrentCurrency(currency) {
    const currencyName = this.currentCurrency;
    expect(currencyName).toContainText(currency);
  }

  async choosecurrentAccount() {
    const account = this.currentAccount;
    const options = account.locator("option");
    await expect(options.nth(1)).toBeAttached();
    const optionsCount = await options.count();
    await account.selectOption({ index: optionsCount - 1 });
  }
}
