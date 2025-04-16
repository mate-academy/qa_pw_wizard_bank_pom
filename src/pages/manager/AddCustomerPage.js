const { expect } = require('@playwright/test');

class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postCodeInput = page.locator('input[ng-model="postCd"]');
    this.addCustomerBtn = page.locator('button[type="submit"]');
  }

  async fillCustomerForm(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
  }

  async submitCustomerForm() {
    await this.addCustomerBtn.click();
  }
}

module.exports = { AddCustomerPage };