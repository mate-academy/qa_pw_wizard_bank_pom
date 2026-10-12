import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async clickDeleteButtonForLastRow() {
    const lastRow = this.page.locator('tbody tr').last();
    const deleteButton = lastRow.getByRole('button', { name: 'Delete' });
    await deleteButton.click();
  }

  async assertLastRowDoesNotContainText(text) {
    const lastRow = this.page.locator('tbody tr').last();
    await expect(lastRow).not.toContainText(text);
  }

  async reloadPage() {
    await this.page.reload();
  }

  async fillSearchField(searchTerm) {
    const searchField = this.page.getByPlaceholder('Search Customer');
    await searchField.fill(searchTerm);
  }

  async assertCustomerRowIsPresent(firstName, lastName, postalCode) {
    const customerRow = this.page.locator('tbody tr').filter({
      hasText: `${firstName} ${lastName} ${postalCode}`,
    });
    await expect(customerRow).toHaveCount(1);
  }
  async assertOnlyOneRowIsPresent() {
    const rows = this.page.locator('tbody tr');
    await expect(rows).toHaveCount(1);
  }

  async assertCustomerHasAccountCount(
  firstName,
  lastName,
  postCode,
  expectedCount,
) {
  const customerRow = this.page.locator('tbody tr').filter({
    hasText: `${firstName} ${lastName} ${postCode}`,
  });

  const accountNumbersCell = customerRow.locator('td').nth(3);

  const accountNumbersText = await accountNumbersCell.textContent();

  const accountNumbers = accountNumbersText
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  await expect(accountNumbers).toHaveLength(expectedCount);
}

async clickDeleteButtonForCustomer(firstName, lastName, postCode) {
  const customerRow = this.page.locator('tbody tr').filter({
    hasText: `${firstName} ${lastName} ${postCode}`,
  });

  await customerRow.getByRole('button', { name: 'Delete' }).click();
}

async assertCustomerRowIsNotPresent(firstName, lastName, postCode) {
  const customerRow = this.page.locator('tbody tr').filter({
    hasText: `${firstName} ${lastName} ${postCode}`,
  });

  await expect(customerRow).toHaveCount(0);
}

}
