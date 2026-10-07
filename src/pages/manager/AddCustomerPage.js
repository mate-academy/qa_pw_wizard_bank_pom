export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstnameField = page.getByPlaceholder('First Name');
    this.lastnameField = page.getByPlaceholder('Last Name');
    this.postcodeField = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('form').getByRole('button', { name: 'Add Customer' });
    this.customersButton = page.getByRole('button', { name: 'Customers' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
  async fillFirstName(firstName) {
    await this.firstnameField.fill(firstName);
  }
  async fillLastName(lastName) {
    await this.lastnameField.fill(lastName);
  }
  async fillPostCode(postCode) {
    await this.postcodeField.fill(postCode);
  }
  async clickAddCustomer() {
    await this.addCustomerButton.click();
  }
  async clickCustomersButton() {
    await this.customersButton.click();
  }
}
