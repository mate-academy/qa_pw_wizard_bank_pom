import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.rows = page.getByRole('row');
    this.lastRow = this.rows.last();
    this.lastRowColumns = this.lastRow.getByRole('cell');
    this.firstNameCell = this.lastRowColumns.nth(0);
    this.lastNameCell = this.lastRowColumns.nth(1);
    this.postCodeCell = this.lastRowColumns.nth(2);
    this.accNumCell = this.lastRowColumns.nth(3);
    this.deleteAccCell = this.lastRowColumns.nth(4);
    this.SearchField = page.getByPlaceholder('Search Customer');
    

  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async pageWaitForUrl(){
    await this.page.waitForURL('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async pageReload(){
    await this.page.reload();
  }

  async assertLastCustomerInformation({firstName, lastName, postCode}){
    await expect(this.firstNameCell).toContainText(firstName);
    await expect(this.lastNameCell).toContainText(lastName);
    await expect(this.postCodeCell).toContainText(postCode);
  }

  async assertAvaiableAccNumCustomerInformation(){
    await expect(this.accNumCell).not.toHaveText('');
  }

  async assertCustomerAvailableInTable({ firstName, lastName, postCode }) {
  const customerRow = this.rows
    .filter({ hasText: firstName })
    .filter({ hasText: lastName })
    .filter({ hasText: postCode });

  await expect(customerRow).toHaveCount(1);
}

  async deleteLastCustomer(){
    await this.deleteAccCell.getByRole('button').click();
  }

  async SearchFieldFill(text){
    await this.SearchField.fill(text);
  }
  
  async assOnlyOneCustomer(){
    await expect(this.rows).toHaveCount(2);
  }
  async emptyAccNumberCustomer(){
    await expect(this.accNumCell).toHaveText('');
}
  

  
 async customerDeleteFromList({ firstName, lastName, postCode }) {
 const deletedCustomerRow = this.rows.filter({ hasText: firstName })
    .filter({ hasText: lastName })
    .filter({ hasText: postCode });
    await expect(deletedCustomerRow).toHaveCount(0);

  }

}
