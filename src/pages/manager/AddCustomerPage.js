

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.addCustomerButton = this.page.getByRole('button', { name: 'Add Customer' })
    }

    async open() {
     await this.page.goto('/angularJs-protractor/BankingProject/#/manager/addCust');
    }

    async fillFirstName(text) {
        await this.firstName.fill(text);   
    }

    async fillLastName(text) {
        await this.lastName.fill(text);   
    }

    async fillPostCode(text) {
        await this.postCode.fill(text);   
    }

    async clickAddCustomerButton() {
        await this.addCustomerButton.click();
    
  }}
