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

  // клік на кнопку реєстрації користувача
  async clickAddCustomerButton() {
    await this.addCustomerButton.click();
  }

  // перевірка появи діалогового вікна
  async assertDialogWindowUserCreated() {
    this.page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('Customer added successfully with customer id');
  
      await dialog.accept();
    })
  }

}
