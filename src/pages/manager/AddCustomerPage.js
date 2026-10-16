export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameField = page.getByRole('textbox', { name: 'First Name' });
    this.lastNameField = page.getByRole('textbox', { name: 'Last Name' });
    this.postCodeField = page.getByRole('textbox', { name: 'Post Code' });
    this.addCustomerButton = page
      .getByRole('form')
      .getByRole('button', { name: 'Add Customer' });
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
      { waitUntil: 'domcontentloaded' },
    );
  }

  async fillFirstName(firstName) {
    await this.firstNameField.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameField.fill(lastName);
  }

  async fillPostalCode(postCode) {
    await this.postCodeField.fill(postCode);
  }

  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  async reload() {
    await this.page.reload();
  }
}