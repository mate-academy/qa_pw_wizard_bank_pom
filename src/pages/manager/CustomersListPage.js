import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
  }

  async AssertCustomerNameAndCode(fname,lname,code) {
    await expect(this.page.getByRole('row').last().getByRole('cell').nth(0)).toContainText(fname);
    await expect(this.page.getByRole('row').last().getByRole('cell').nth(1)).toContainText(lname);
    await expect(this.page.getByRole('row').last().getByRole('cell').nth(2)).toContainText(code);
    await expect(this.page.getByRole('row').last().getByRole('cell').nth(3)).toContainText('');
  }

  async AssertCustomer() {
    await expect(this.page.getByRole('row').last().getByRole('cell').nth(3)).not.toHaveText('');
  }

  async AssertCustomerVisible(str) {
    await expect(this.page.getByRole('row').getByText(str)).toBeVisible();
  }

  async allExeptCustomerHidden(str) {
    await expect(this.page.locator('tbody tr')).toHaveCount(1);
  }

  async AssertCustomerHidden(Customer) {
    await expect(this.page.getByRole('row').getByText(Customer)).toBeHidden();
  }

  async deleteLastCustomer(){
    const Customer = await this.page.getByRole('row').last().getByRole('cell').nth(0).innerText();
    await this.page.getByRole('row').last().getByRole('button', { name: 'Delete' }).click();
    return Customer;
  }

  async search(str){
    await this.page.getByPlaceholder('Search Customer').fill(str);
  }

  async reload(){
    await this.page.reload();
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }
}
