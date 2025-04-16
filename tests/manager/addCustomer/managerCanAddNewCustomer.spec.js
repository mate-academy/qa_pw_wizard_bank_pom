const { test, expect } = require('@playwright/test');
const { faker } = require('@faker-js/faker');
const { BankManagerMainPage } = require('../../../src/pages/manager/BankManagerMainPage.js');
const { AddCustomerPage } = require('../../../src/pages/manager/AddCustomerPage.js');
const { CustomersListPage } = require('../../../src/pages/manager/CustomersListPage.js');

test('Manager can add new customer', async ({ page }) => {
  const managerMainPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);
  
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode('#####');

  await test.step('1. Open add customer page', async () => {
    await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust');
    await expect(page).toHaveURL(/addCust$/);
  });

  await test.step('2-5. Fill customer form and submit', async () => {
    await addCustomerPage.fillCustomerForm(firstName, lastName, postCode);
    await addCustomerPage.submitCustomerForm();
    await page.waitForTimeout(1000); 
  });

  await test.step('6. Reload page to close popup', async () => {
    await page.reload();
  });

  await test.step('7. Navigate to customers list', async () => {
    await managerMainPage.clickCustomersTab();
  });

  await test.step('8-11. Verify customer in table', async () => {
    const lastRow = customersListPage.customerRows.last();
    await expect(lastRow.locator('td:nth-child(1)')).toHaveText(firstName);
    await expect(lastRow.locator('td:nth-child(2)')).toHaveText(lastName);
    await expect(lastRow.locator('td:nth-child(3)')).toHaveText(postCode);
    await expect(lastRow.locator('td:nth-child(4)')).toBeEmpty();
  });
});
/* 
Test:
1. Open add customer page by link https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/addCust
2. Fill the First Name.  
3. Fill the Last Name.
4. Fill the Postal Code.
5. Click [Add Customer].
6. Reload the page (This is a simplified step to close the popup)
7. Click [Customers] button.
8. Assert the First Name of the customer is present in the table in the last row. 
9. Assert the Last Name of the customer is present in the table in the last row. 
10. Assert the Postal Code of the customer is present in the table in the last row. 
11. Assert there is no account number for the new customer in the table in the last row. 

Tips:
1. Use faker for test data generation, example:
usage:
 const firstName = faker.person.firstName();
 const lastName = faker.person.LastName();
 const postCode = faker.location.zipCode(); 

 2. Do not rely on the customer row id for the steps 8-11. Use the ".last()" locator to get the last row.
*/
