import { expect } from "@playwright/test";

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currenciesSelectDropdown = page.getByTestId("currency");
    this.customerNameDropdown = page.getByTestId('userSelect')
    this.processButton = page.getByRole('button', { name: 'Process' })
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/openAccount",
    );
  }

  async selectDollar() {
    await this.currenciesSelectDropdown.selectOption("Dollar");
  }

  async assertDropdownHasValueDollar() {
    await expect(this.currenciesSelectDropdown).toHaveValue("Dollar");
  }

  async selectPound() {
    await this.currenciesSelectDropdown.selectOption("Pound");
  }

  async assertDropdownHasValuePound() {
    await expect(this.currenciesSelectDropdown).toHaveValue("Pound");
  }

  async selectRupee() {
    await this.currenciesSelectDropdown.selectOption("Rupee");
  }

  async assertDropdownHasValueRupee() {
    await expect(this.currenciesSelectDropdown).toHaveValue("Rupee");
  }

  async selectCustomerName(firstName,lastName) {
    await this.customerNameDropdown.selectOption({label: `${firstName} ${lastName}`})
  }

  async clickProcessButton() {
    await this.processButton.click()
  }
}
