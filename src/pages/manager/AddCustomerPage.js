const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page) {
    this.page = page; 
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page. getByRole('form').getByRole('button', { name: 'Add Customer' });

    }

  

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async waitForOpened() {
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/addCust');
    }
   
    async reload() {
      await this.page.reload();
    }

    async fillFirstName(firstName) {
      await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName) {
        await this.lastNameInput.fill(lastName);
    }

    async fillPostCode(postCode) {
        await this.postCodeInput.fill(postCode);
    }

    async clickAddCustomerButton() {
      await this.addCustomerButton.click();
    }

    async assertFirstNameFieldContainsValue(expectedValue) {
      const currentValue = await this.firstNameInput.inputValue();
      expect(currentValue).toBe(expectedValue);
  }

   async assertLastNameFieldContainsValue(expectedValue) {
      const currentValue = await this.lastNameInput.inputValue();
      expect(currentValue).toBe(expectedValue);
  }

    async assertPostCodeFieldContainsValue(expectedValue) {
      const currentValue = await this.postCodeInput.inputValue();
      expect(currentValue).toBe(expectedValue);
  }


    async verifyCustomerAddedAlert() {
       const alert = this.page.on('dialog', dialog => {
        expect(dialog.message()).toContain('Customer added successfully');
        dialog.accept();
    });
}

}