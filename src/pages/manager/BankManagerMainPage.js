export class BankManagerMainPage {
  constructor(page) {
    this.page = page;
    this.addCustomerTab = page.getByRole('button', { name: 'Add Customer' });
    this.openAccountTab = page.getByRole('button', { name: 'Open Account' });
    this.customersTab = page.getByRole('button', { name: 'Customers' });
  }

  async clickAddCustomerTab() {
    await this.addCustomerTab.click();
  }

  async clickOpenAccountTab() {
    await this.openAccountTab.click();
  }

  async clickCustomersTab() {
    await this.customersTab.click();
  }
}