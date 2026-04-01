export class AddCustomerPage {
  constructor(page) {
    this.page = page;
  }

  async fillFName(name) {
    await this.page.getByPlaceholder('First Name').fill(name); 
  }
  async fillLName(name) {
    await this.page.getByPlaceholder('Last Name').fill(name); 
  }
  async fillPostCode(pcode) {
    await this.page.getByPlaceholder('Post Code').fill(pcode); 
  }

  async AddCustomer() {
    await this.page.getByRole('button', { name: 'Add Customer' }).last().click(); 
  }
  
  async clickCustomers() {
    await this.page.getByRole('button', { name: 'Customers' }).click(); 
  }

  async clickOpenAcc() {
    await this.page.getByRole('button', { name: 'Open Account' }).click();
    await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount');
  }

  async reload(){
    await this.page.reload();
  }
  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }
}
