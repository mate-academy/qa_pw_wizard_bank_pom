import { expect } from '@playwright/test';

export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.postCode = page.getByPlaceholder('Post Code');
    this.addCustomerButton = page.getByRole('button', {name: 'Add Customer'}).nth(1);
  }

  // відкриття сторінки реєстрації кастомера
  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  // заповнення імені кастомера
  async fillCustomerFirstName(firstName) {
    await this.firstName.fill(firstName);
  }

  // заповнення прізвища кастомера
  async fillCustomerLastName(lastName) {    
    await this.lastName.fill(lastName);
  }

  // заповнення postal code кастомера
  async fillCustomerPostalCode(postalCode) {
    await this.postCode.fill(postalCode);
  }

  // перевірка появи діалогового вікна
  async clickAddCustomerButtonAndHandleDialog() {
    const dialogPromise = this.page.waitForEvent('dialog');

    const clickPromise = this.addCustomerButton.click();

    const dialog = await dialogPromise;

    expect(dialog.message()).toContain('Customer added successfully');

    await dialog.accept();

    await clickPromise;
  }

}
