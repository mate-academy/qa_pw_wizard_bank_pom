import { expect } from "@playwright/test";

export class AddCustomerPage {
  constructor(page) {
    this.page = page;

    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postCodeInput = page.locator('input[ng-model="postCd"]');
    this.addCustomerBtn = page.locator('button[type="submit"]');
  }

  async open() {
    await this.page.goto(
      "/angularJs-protractor/BankingProject/#/manager/addCust",
    );
  }

  async fillForm(fName, lName, pCode) {
    await this.firstNameInput.fill(fName);
    await this.lastNameInput.fill(lName);
    await this.postCodeInput.fill(pCode);
  }

  async submit() {
    await this.addCustomerBtn.click();
  }
}
