
import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can delete customer', async ({ page }) => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode();

  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  await addCustomerPage.open();
  await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);

  page.once('dialog', (dialog) => dialog.accept());
  await addCustomerPage.submitForm();

  await customersListPage.open();

  const customerRow = page.locator('table tbody tr').filter({
    hasText: firstName,
  }).filter({
    hasText: lastName,
  });

  await expect(customerRow).toHaveCount(1);

  page.once('dialog', (dialog) => dialog.accept());
  await customerRow.getByRole('button', { name: 'Delete' }).click();

  await expect(customerRow).toHaveCount(0);

  await page.reload();

  await expect(customerRow).toHaveCount(0);
});
