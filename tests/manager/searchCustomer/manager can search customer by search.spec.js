import { expect, test } from '@playwright/test';
import { faker, fi } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test.describe('Manager can search customer by search', () => {
let firstName;
let lastName;
let postCode;
let addCustPage;
let custListPage;
let createdCustomer;



test.beforeEach(async ({ page }) => {
addCustPage = new AddCustomerPage(page);
custListPage = new CustomersListPage(page);
createdCustomer = custListPage.getCreatedCustomerRow(firstName, lastName, postCode);


firstName = faker.person.firstName();
lastName = faker.person.lastName();
postCode = faker.location.zipCode();

await addCustPage.open();
await addCustPage.firstNameField.fill(firstName);
await addCustPage.lastNameField.fill(lastName);
await addCustPage.postCodeField.fill(postCode);
await addCustPage.submitAddCustomerButton.click();

  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  
});

test('Assert manager can search customer by First Name', async ({ page }) => {
const custFirstname = custListPage.getCreatedCustomerRow(firstName);


await custListPage.open();
await custListPage.searchCustomerField.fill(firstName);
await expect(custFirstname).toBeVisible();
await custListPage.assertNoOtherRowsPresented();

});
test('Assert manager can search customer by Last Name', async ({ page }) => {
 const custLastName = custListPage.getCreatedCustomerRow(lastName);


await custListPage.open();
await custListPage.searchCustomerField.fill(firstName);
await expect(custLastName).toBeVisible();
await custListPage.assertNoOtherRowsPresented();
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
   const custPostCode = custListPage.getCreatedCustomerRow(postCode);


await custListPage.open();
await custListPage.searchCustomerField.fill(firstName);
await expect(custPostCode).toBeVisible();
await custListPage.assertNoOtherRowsPresented();
});

});