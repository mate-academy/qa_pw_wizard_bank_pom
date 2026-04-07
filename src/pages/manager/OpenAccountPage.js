import { expect } from "@playwright/test";

export class OpenAccountPage {
  constructor(page) {
    this.page = page;

    this.processButton = page.getByRole("button", { name: "Process" });

    this.customerDropDown = page.getByTestId("userSelect");
    this.currencyDropDown = page.getByTestId("currency");
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/openAccount",
    );
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  async selectCustomer(customerName) {
    await this.customerDropDown.selectOption(customerName);
  }

  async selectCurrency(currencyName) {
    await this.currencyDropDown.selectOption(currencyName);
  }

  async assertCurrencySelected(currencyName) {
    await expect(this.currencyDropDown).toHaveValue(currencyName);
  }
}
