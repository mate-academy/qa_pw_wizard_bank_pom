import { expect } from "@playwright/test";

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currencySelect = page.getByTestId("currency");
    this.openAccountButton = page.getByRole("button", { name: "Open Account" });
    this.customerSelect = page.getByTestId("userSelect");
    this.processButton = page.getByRole("button", { name: "Process" });
    this.customerTab = page.getByRole("button", { name: "Customers" });
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/openAccount",
    );
  }
  async waitForLoading() {
    await this.page.waitForURL(
      "/angularJs-protractor/BankingProject/#/manager/openAccount",
    );
  }
  async verifyCurrencySelect(currency) {
    await this.currencySelect.selectOption(currency);
    await expect(this.currencySelect).toHaveValue(currency);
  }

  async clickOpenAccount() {
    await this.openAccountButton.click();
  }
  async selectCustomer(person) {
    await this.customerSelect.selectOption(
      `${person.firstName} ${person.lastName}`,
    );
  }
  async selectCurrency(currency) {
    await this.currencySelect.selectOption(currency);
  }
  async clickProcess() {
    await this.processButton.click();
  }
  async goCustomersTab() {
    await this.customerTab.click();
  }
}
