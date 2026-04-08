import { expect } from "@playwright/test";

export class CustomerLoginPage {
  constructor(page) {
    this.page = page;
    this.customerDropDown = page.getByTestId("userSelect");
    this.loginButton = page.getByRole("button", { name: "Login" });
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/customer");
    await this.page.waitForLoadState("networkidle");
  }

  async waitForOpened() {
    await this.page.waitForURL("**/customer");
  }

  async selectCustomer(customerName) {
    await this.page.waitForSelector(`option:has-text("${customerName}")`, {
      state: "attached",
    });
    await this.customerDropDown.selectOption({ label: customerName });
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async assertSelectCustomerDropdownIsVisible() {
    await expect(this.customerDropDown).toBeVisible();
  }
}
