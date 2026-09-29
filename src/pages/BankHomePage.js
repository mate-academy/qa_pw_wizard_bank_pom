<<<<<<< HEAD
import { expect } from "@playwright/test";
=======
import { expect } from '@playwright/test';
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd

export class BankHomePage {
  constructor(page) {
    this.page = page;
<<<<<<< HEAD
    this.managerLoginButton = page.getByRole("button", {
      name: "Bank Manager Login",
    });
    this.managerAddButton = page.getByRole("button", {
      name: "Add Customer",
    });
    this.managerOpenButton = page.getByRole("button", {
      name: "Open Account",
    });
    this.managerCustomersButton = page.getByRole("button", {
      name: "Customers",
=======
    this.customerLoginButton = page.getByRole('button', {
      name: 'Customer Login',
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
    });
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/login");
  }

  async clickManagerLoginButton() {
    await this.managerLoginButton.click();
  }
<<<<<<< HEAD

  async visibleAddButton() {
    await expect(this.managerAddButton).toBeVisible();
  }

  async visibleOpenButton() {
    await expect(this.managerOpenButton).toBeVisible();
  }

  async visibleCustomerButton() {
    await expect(this.managerCustomersButton).toBeVisible();
  }
=======
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
}
