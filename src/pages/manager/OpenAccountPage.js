import { expect } from "@playwright/test";

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.addCustomerButton = page.getByRole("button", { name: "Add Customer" });
    this.openAccountButton = page.getByRole("button", { name: "Open Account" });
    this.customersButton = page.getByRole("button", { name: "Customers" });
    this.homeButton = page.getByRole("button", { name: "Home" });
    this.mainHeaderTitle = page.getByText("XYZ Bank");
    this.customerLabel = page.getByText("label", { name: "Customer :" });
    this.customerDropDownList = page.locator("#userSelect");
    this.currencyLabel = page.getByText("label", { name: "Currency :" });
    this.currencyDropDownList = page.locator("#currency");
    this.processSubmitButton = page.getByRole("button", { name: "Process" });
  }
  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/openAccount",
    );
  }
  async assertAddCustomerButtonIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }
  async assertOpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }
  async assertCustomersButtonIsVisible() {
    await expect(this.customersButton).toBeVisible();
  }
  async assertHomeButtonIsVisible() {
    await expect(this.homeButton).toBeVisible();
  }
  async assertMainHeaderTitleIsVisible() {
    await expect(this.mainHeaderTitle).toBeVisible();
  }
  async assertCustomerLabelIsVisible() {
    await expect(this.customerLabel).toBeVisible();
  }
  async assertCustomerDropDownListIsVisible() {
    await expect(this.customerDroppDownList).toBeVisible();
  }
  async assertcurrencyLabelIsVisible() {
    await expect(this.currencyLabel).toBeVisible();
  }
  async assertCurrencyDropDownListIsVisible() {
    await expect(this.currencyDroppDownList).toBeVisible();
  }
  async selectCustomer(customerName) {
    await this.customerDropDownList.selectOption({ label: customerName });
  }
  async selectCurrency(currency) {
    await this.currencyDropDownList.selectOption(currency);
  }
  async assertCurrencyDropDownListHasValue(currency) {
    await expect(this.currencyDropDownList).toHaveValue(currency);
  }
  async clickProcess() {
    await this.processSubmitButton.click();
  }
  async clickOpenAccountButton() {
    await this.openAccountButton.click();
  }
  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
