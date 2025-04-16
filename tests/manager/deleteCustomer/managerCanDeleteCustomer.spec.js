const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { BankManagerMainPage } = require('../../../src/pages/manager/BankManagerMainPage.js');
const { AddCustomerPage } = require('../../../src/pages/manager/AddCustomerPage.js');
const { CustomersListPage } = require('../../../src/pages/manager/CustomersListPage.js');

test.describe('Customer deletion flow', () => {
  let customerData;

  test.beforeEach(async ({ page }) => {
    const managerMainPage = new BankManagerMainPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    
    customerData = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      postCode: faker.location.zipCode('#####')
    };

    await test.step('Create test customer', async () => {
      await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');
      await managerMainPage.clickAddCustomerTab();
      await addCustomerPage.fillCustomerForm(customerData.firstName, customerData.lastName, customerData.postCode);
      await addCustomerPage.submitCustomerForm();
      await page.waitForTimeout(1000);
    });
  });

  test('Manager can delete customer', async ({ page }) => {
    const managerMainPage = new BankManagerMainPage(page);
    const customersListPage = new CustomersListPage(page);

    await test.step('1. Navigate to Customers page', async () => {
      await managerMainPage.clickCustomersTab();
      await expect(page).toHaveURL(/list$/);
    });

    await test.step('2. Search and delete customer', async () => {
      await customersListPage.searchCustomer(customerData.firstName);
      const customerRow = await customersListPage.getCustomerRow(customerData.firstName);
      await expect(customerRow).toBeVisible();
      
      const initialCount = await customersListPage.customerRows.count();
      await customersListPage.deleteCustomer(customerData.firstName);
      await expect(customersListPage.customerRows).toHaveCount(initialCount - 1);
    });

    await test.step('3-5. Verify customer deletion after reload', async () => {
      await page.reload();
      await customersListPage.searchCustomer(customerData.firstName);
      await expect(customersListPage.customerRows).toHaveCount(0);
      console.log(`Successfully deleted customer: ${customerData.firstName}`);
    });
  });
});