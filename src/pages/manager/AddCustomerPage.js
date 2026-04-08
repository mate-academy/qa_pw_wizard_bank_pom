// В файлі AddCustomerPage.js
export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.locator('input[ng-model="fName"]');
    this.lastNameInput = page.locator('input[ng-model="lName"]');
    this.postCodeInput = page.locator('input[ng-model="postCd"]');
    this.submitBtn = page.locator('form button[type="submit"]');
  }

  async addCustomer(fName, lName, pCode) {
    await this.firstNameInput.fill(fName);
    await this.lastNameInput.fill(lName);
    await this.postCodeInput.fill(pCode);
    await this.submitBtn.click();
  }
}