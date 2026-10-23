
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can open new account', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  // Create a customer
  await addCustomerPage.open();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);

  page.once('dialog', (dialog) => dialog.accept());
  await addCustomerPage.submitForm();

  // Open account page
  await page.goto('/angularJs-protractor/BankingProject/#/manager/openAccount');

  await page.locator('#userSelect').selectOption({
    label: `${firstName} ${lastName}`,
  });

  await page.locator('#currency').selectOption({ label: 'Dollar' });

  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Process' }).click();

  // Close popup and open customers list
  await page.reload();
  await customersListPage.open();

  // Verify account number is not empty
  const lastRow = page.locator('table tbody tr').last();

  await expect(lastRow).toContainText(firstName);
  await expect(lastRow).toContainText(lastName);
  await expect(lastRow.locator('td').nth(3)).not.toBeEmpty();
});
