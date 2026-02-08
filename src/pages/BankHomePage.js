export class BankHomePage {
  constructor(page) {
    this.page = page;
    this.customerLoginButton = page.getByRole('button', {
      name: 'Customer Login',
    });
    this.managerLoginButton = page.getByRole('button', {name: 'Bank Manager Login'});
  }

  // відкриття головної сторінки банку
  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  // клік на кнопку з логіном користувача
  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }

  // клік на кнопку з логіном менеджера
  async clickManagerLoginButton() {
    await this.managerLoginButton.click();
  }
}
