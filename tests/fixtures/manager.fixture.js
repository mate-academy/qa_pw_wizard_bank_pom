import { test as base } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../src/pages/manager/AddCustomerPage';

export const test = base.extend({
  customer: async ({ page }, use) => {
    const customer = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postalCode: faker.location.zipCode(),
    };
    const addCustomerPage = new AddCustomerPage(page);

    await addCustomerPage.open();
    await addCustomerPage.fillCustomerForm(
      customer.firstName,
      customer.lastName,
      customer.postalCode,
    );
    await addCustomerPage.clickAddCustomerButton();
    await page.reload();

    await use(customer);
  },
});