export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByPlaceholder('First Name');
    this.lastNameField = page.getByPlaceholder('Last Name');
   this.postalCodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('button', { name: 'Add Customer' }).last();
    this.customerButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(firstName) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async fillPostalCode(postCode) {
    await this.postalCodeField.fill(postCode);
  }

  async clickAddCustomer() {
    await this.addCustomerButton.click();
  }

  async clickCustomerButton() {
    await this.customerButton.click();
  }

}