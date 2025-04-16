const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { BankManagerMainPage } = require('../../../src/pages/manager/BankManagerMainPage.js');
const { AddCustomerPage } = require('../../../src/pages/manager/AddCustomerPage.js');
const { CustomersListPage } = require('../../../src/pages/manager/CustomersListPage.js');

test.describe('Customer search by Last Name', () => {
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
      await page.waitForTimeout(1000); // Чекаємо сповіщення
      await page.reload(); // Закриваємо попап
    });
  });

  test('Manager can search customer by Last Name', async ({ page }) => {
    const managerMainPage = new BankManagerMainPage(page);
    const customersListPage = new CustomersListPage(page);

    await test.step('1. Navigate to Customers page', async () => {
      await managerMainPage.clickCustomersTab();
      await expect(page).toHaveURL(/list$/);
    });

    await test.step('2. Search by Last Name', async () => {
      await customersListPage.searchCustomer(customerData.lastName);
    });

    await test.step('3-4. Verify search results', async () => {
      const visibleRows = await customersListPage.customerRows.count();
      await expect(visibleRows).toBe(1);
      
      const foundRow = customersListPage.customerRows.first();
      await expect(foundRow.locator('td:nth-child(1)')).toHaveText(customerData.firstName);
      await expect(foundRow.locator('td:nth-child(2)')).toHaveText(customerData.lastName);
      await expect(foundRow.locator('td:nth-child(3)')).toHaveText(customerData.postCode);
      
      console.log(`Found customer by last name: ${customerData.lastName}`);
    });
  });
});