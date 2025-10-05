import { BasePage } from '../../BasePage.js';

export class AddCustomerPage extends BasePage {
  constructor(page) {
    super(page);
    this.firstNameInput = page.locator('input[placeholder="First Name"]');
    this.lastNameInput = page.locator('input[placeholder="Last Name"]');
    this.postCodeInput = page.locator('input[placeholder="Post Code"]');
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' });
  }

  async addCustomer(firstName, lastName, postCode) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postCodeInput.fill(postCode);

    const dialogPromise = this.page.waitForEvent('dialog');
    await this.addCustomerButton.click();
    const dialog = await dialogPromise;
    const message = dialog.message();
    await dialog.accept();
    return message;
  }
}
