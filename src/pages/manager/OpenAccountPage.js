const { expect } = require('@playwright/test');

export class AddCustomerPage {
  constructor(page) {
    this.page = page; 

    this.openAccBtn = page.getByRole('button', {name: 'Open Account'});
    this.customerField = page.locator('#userSelect');
    this.currencyField = page.locator('#currency');
    this.newCustItem = this.customerField.locator('option').last();

    this.proceesBtn = page.getByRole('button', {name: 'Process'});
    this.newCustAccNumb = page.getByRole('row').last().getByRole('cell').nth(3);

    this.searchField = page.getByPlaceholder('Search Customer');
    this.firstName = 'User';
    this.searchedFirst = page.getByRole('row').filter({hasText: this.firstName});
    this.lastName = 'Test';
    this.searchedLast = page.getByRole('row').filter({hasText: this.lastName});
    this.postalCode = '79000'
    this.searchedCode = page.getByRole('row').filter({hasText: this.postalCode});

    this.rows = this.page.locator('tr');

  }

  async openAccountPage() {
    await this.openAccBtn.click();
    await expect(this.customerField).toBeVisible();
  }

  async selectDollarCurrency(){
    await this.currencyField.selectOption('Dollar');
    await expect(this.currencyField).toContainText('Dollar');
  }

  async selectPoundCurrency(){
    await this.currencyField.selectOption('Pound');
    await expect(this.currencyField).toContainText('Pound');
  }

  async selectRupeeCurrency(){
    await this.currencyField.selectOption('Rupee');
    await expect(this.currencyField).toContainText('Rupee');
  }

  async selectAddedCustomer(){
    const lastOptionValue = await this.customerField.locator('option').last().getAttribute('value');
    await this.customerField.selectOption(lastOptionValue); 
  }

  async saveAddedCustData(){
    await this.proceesBtn.click();
    await this.page.reload();
  }

  async chechAddedCustData(){
    await expect(this.newCustAccNumb).not.toHaveText('');
  }

  async getRowCount() {
    return await this.rows.count();
  }

  async findByFirstName(){
    await this.searchField.fill(this.firstName);
    await expect(this.searchedFirst).toBeVisible();
    const rowCount = await this.getRowCount();
    expect(rowCount).toBe(2);
  }

  async findByLastName(){
    await this.searchField.fill(this.lastName);
    await expect(this.searchedLast).toBeVisible();
    const rowCount = await this.getRowCount();
    expect(rowCount).toBe(2);
  }

  async findByPostalCode(){
    await this.searchField.fill(this.postalCode);
    await expect(this.searchedCode).toBeVisible();
    const rowCount = await this.getRowCount();
    expect(rowCount).toBe(2);
  }

}