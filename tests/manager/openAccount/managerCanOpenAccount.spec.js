import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

const fakerFirstName = faker.person.firstName();
const fakerLastName = faker.person.lastName();
const fakerPostCode = faker.location.zipCode();

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(fakerFirstName);
  await addCustomerPage.fillLastName(fakerLastName);
  await addCustomerPage.fillPostalCode(fakerPostCode);
  await addCustomerPage.clickAddCustomerButton();
  await page.reload();

  /* 
  Pre-conditons:
  1. Open Add Customer page
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  6. Reload the page (This is a simplified step to close the popup).
  */
});

test('Assert manager can add new customer', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);
  const costumerNameLastname = fakerFirstName + ' ' + fakerLastName;

  await openAccountPage.openAccBtnClick();
  await openAccountPage.selectUser(costumerNameLastname);
  await openAccountPage.selectCurency('Dollar');
  await openAccountPage.processButtonClick();
  await page.reload();
  await openAccountPage.costumersButtonClick();
  await page.waitForTimeout(1000);
  await customersListPage.assertIsPresentAccountNumberNewUser();

  /* 
  Test:
  1. Click [Open Account].
  2. Select Customer name you just created.
  3. Select currency.
  4. Click [Process].
  5. Reload the page (This is a simplified step to close the popup).
  6. Click [Customers].
  7. Assert the customer row has the account number not empty.
  
  Tips:
   1. Do not rely on the customer row id for the step 13. Use the ".last()" locator to get the last row.
  */
});