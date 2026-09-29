<<<<<<< HEAD
import { expect } from "@playwright/test";
=======
import { expect } from '@playwright/test';
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
<<<<<<< HEAD
    this.currentCurrency = page.getByTestId("currency");
    this.currentAccount = page.getByTestId("userSelect");
=======
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
  }

  async open() {
    await this.page.goto(
<<<<<<< HEAD
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

  async chooseCurrentAccount() {
    const account = this.currentAccount;
    const options = account.locator("option");
    await expect(options.nth(1)).toBeAttached();
    const optionsCount = await options.count();
    await account.selectOption({ index: optionsCount - 1 });
  }
=======
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
}
