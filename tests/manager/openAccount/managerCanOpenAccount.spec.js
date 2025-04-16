const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { BankManagerMainPage } = require('../../../src/pages/manager/BankManagerMainPage.js');
const { AddCustomerPage } = require('../../../src/pages/manager/AddCustomerPage.js');
const { OpenAccountPage } = require('../../../src/pages/manager/OpenAccountPage.js');
const { CustomersListPage } = require('../../../src/pages/manager/CustomersListPage.js');

test.describe('Account opening flow', () => {
  let customerData;
  const accountCurrency = 'Dollar';

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
      await page.reload();
    });
  });

  test('Manager can open account', async ({ page }) => {
    const managerMainPage = new BankManagerMainPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customersListPage = new CustomersListPage(page);

    await test.step('Open Account page', async () => {
      await managerMainPage.clickOpenAccountTab();
    });

    await test.step('Process new account', async () => {
      await openAccountPage.selectCustomer(`${customerData.firstName} ${customerData.lastName}`);
      await openAccountPage.selectCurrency(accountCurrency);
      await openAccountPage.processAccount();
      await page.waitForTimeout(1000);
    });

    await test.step('Verify account creation', async () => {
      await managerMainPage.clickCustomersTab();
      const lastRow = customersListPage.customerRows.last();
      await expect(lastRow.locator('td:nth-child(4)')).not.toBeEmpty();
    });
  });
});