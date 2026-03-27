import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.currency = page.locator('#currency');
    this.customer = page.locator('#userSelect');
    this.option = page.getByTestId('currency');
  
    this.processButton = page.getByRole('button', { name: 'Process'});
    this.customersButton = page.getByRole('button', { name: 'Customers'});

  }
  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async waitForLoadingCustomers() {
    await this.page.waitForURL('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/list');
  }

  async selectCurrencyDollar() {
    await this.currency.selectOption('Dollar');
  }

  async assertOptionDollar(text) {
    await expect(this.option).toHaveValue('Dollar');
  }

  async selectCurrencyPound() {
    await this.currency.selectOption('Pound');
  }

  async assertOptionPound(text) {
    await expect(this.option).toHaveValue('Pound');
  }

  async selectCurrencyRupee() {
    await this.currency.selectOption('Rupee');
  }

  async assertOptionRupee(text) {
    await expect(this.option).toHaveValue('Rupee');
  }
  

  async selectLastCustomer() {
    // Ждем, чтобы список не был пустым
    // await expect(this.customer.locator('option').first()).toBeVisible();
    
    // Выбираем ПОСЛЕДНЮЮ опцию по индексу через объект конфигурации
    // Playwright сам найдет последнюю, если мы укажем ее через локатор
    const lastValue = await this.customer.locator('option').last().getAttribute('value');
    await this.customer.selectOption(lastValue);
  }

   async clickProcessButton() {
    await this.processButton.click();
  }
   async clickCustomersButton() {
    await this.customersButton.click();
  }
  
}
