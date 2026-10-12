import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage} from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';


test.describe('Manager can delete Customer', () => {
  let addCustomerPage;
  let customersListPage;
  let firstName; 
  let lastName; 
  let zipCode;
  let createdCustomer;


test.beforeEach(async ({ page }) => {
  addCustomerPage = new AddCustomerPage(page);
  customersListPage = new CustomersListPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  zipCode = faker.location.zipCode();

  
  await addCustomerPage.open();
  await addCustomerPage.firstNameField.fill(firstName);
  await addCustomerPage.lastNameField.fill(lastName);
  await addCustomerPage.postCodeField.fill(zipCode);
  await addCustomerPage.submitAddCustomerButton.click();
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
});

test('Assert manager can delete customer', async ({ page }) => {
 createdCustomer = customersListPage.getCreatedCustomerRow(firstName, lastName, zipCode);

  await customersListPage.open();
  await customersListPage.lastCustomerDeleteButton.click();
  await expect(createdCustomer).toBeHidden();
  await page.reload();
  await expect(createdCustomer).toBeHidden();

  /* 
  Test:
  1. Open Customers page.
  2. Click [Delete] for the row with customer name.
  3. Assert customer row is not present in the table. 
  4. Reload the page.
  5. Assert customer row is not present in the table. 
  */
});
});