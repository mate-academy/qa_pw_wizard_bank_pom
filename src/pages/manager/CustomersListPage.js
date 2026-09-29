<<<<<<< HEAD
import { expect } from "@playwright/test";
=======
import { expect } from '@playwright/test';
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd

export class CustomersListPage {
  constructor(page) {
    this.page = page;
<<<<<<< HEAD
    this.lastCustomerField = page.locator("tbody tr").last();
    this.customerDeleteButton = page.locator("tbody tr").last();
    this.customerSearch = page.getByPlaceholder("Search Customer");
=======
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
  }

  async open() {
    await this.page.goto("/angularJs-protractor/BankingProject/#/manager/list");
  }
<<<<<<< HEAD

  async lastCustomerName(expectedFirstName) {
    const cells = this.lastCustomerField.locator("td");
    await expect(cells.nth(0)).toHaveText(expectedFirstName);
  }

  async lastCustomerLastname(expectedLastName) {
    const cells = this.lastCustomerField.locator("td");
    await expect(cells.nth(1)).toHaveText(expectedLastName);
  }

  async lastCustomerPostCode(expectedPostCode) {
    const cells = this.lastCustomerField.locator("td");
    await expect(cells.nth(2)).toHaveText(expectedPostCode);
  }

  async lastCustomerAccountNumber() {
    const cells = this.lastCustomerField.locator("td");
    await expect(cells.nth(3)).toBeEmpty();
  }

  async deleteCustomerAccount(firstName) {
    const customerRow = this.page.getByRole("row", { name: firstName });
    await customerRow.getByRole("button").click();
  }

  async deletedAccount(firstName) {
    const customerRow = this.page.getByRole("row", { name: firstName });
    await expect(customerRow).toBeHidden();
  }

  async customerSearchField(firstName) {
    await this.customerSearch.fill(firstName);
  }

  async assertOnlyOneRowPresent() {
    // Знаходимо всі рядки саме в тілі таблиці (ігноруючи заголовки)
    const rows = this.page.locator("tbody tr");

    // Перевіряємо, що після фільтрації залишився рівно 1 рядок
    await expect(rows).toHaveCount(1);
  }
=======
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
}
