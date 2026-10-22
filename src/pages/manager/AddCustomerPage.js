import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.submitButton = page.locator('form button[type="submit"]');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillCustomerForm(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);
  }

  async clickSubmitButton() {
    await this.submitButton.click();
  }

  // The handler accepts the alert itself: the click does not finish
  // until the alert is closed.
  async submitAndGetAlertMessage() {
    const messagePromise = new Promise((resolve) => {
      this.page.once('dialog', async (dialog) => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
    await this.submitButton.click();
    return messagePromise;
  }

  async assertFormIsVisible() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postCodeInput).toBeVisible();
    await expect(this.submitButton).toBeVisible();
  }

  async assertFormIsEmpty() {
    await expect(this.firstNameInput).toHaveValue('');
    await expect(this.lastNameInput).toHaveValue('');
    await expect(this.postCodeInput).toHaveValue('');
  }

  async assertAlertMessage(actualMessage, expected) {
    if (expected instanceof RegExp) {
      expect(actualMessage).toMatch(expected);
    } else {
      expect(actualMessage).toContain(expected);
    }
  }

  async assertAllFieldsAreRequired() {
    for (const input of [
      this.firstNameInput,
      this.lastNameInput,
      this.postCodeInput,
    ]) {
      const isMissing = await input.evaluate((el) => el.validity.valueMissing);
      expect(isMissing).toBe(true);
    }
  }
}