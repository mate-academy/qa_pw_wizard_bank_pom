export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customerButton = page.getByRole('button', { name: 'Customers' });
  }

  async customerButtonClick() {
    await this.customerButton.click();
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
  }

  async fillFirstName(text) {
    await this.firstNameInput.fill(text);
  }

  async fillLastName(text) {
    await this.lastNameInput.fill(text);
  }

  async fillPostalCode(text) {
    await this.postalCodeInput.fill(text);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }
}