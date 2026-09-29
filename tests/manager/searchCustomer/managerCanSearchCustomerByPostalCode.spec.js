import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";
import { AddCustomerPage } from "../../../src/pages/manager/AddCustomerPage";
import { CustomersListPage } from "../../../src/pages/manager/CustomersListPage";

let firstName;
let lastName;
<<<<<<< HEAD
let postCode;
=======
let postalCode;
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd

test.beforeEach(async ({ page }) => {
  /* 
  Pre-conditons:
  1. Open Add Customer page.
  2. Fill the First Name.  
  3. Fill the Last Name.
  4. Fill the Postal Code.
  5. Click [Add Customer].
  */
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
<<<<<<< HEAD
  postCode = faker.location.zipCode();

  const addCustomer = new AddCustomerPage(page);

  await addCustomer.open();
  await addCustomer.customerName(firstName);
  await addCustomer.customerLastname(lastName);
  await addCustomer.customerPostal(postCode);
  await addCustomer.customerAdd();
  await page.reload();
  await addCustomer.customerList();
});

test("Assert manager can search customer by Postal Code", async ({ page }) => {
=======
  postalCode = faker.location.zipCode();
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
  /* 
  Test:
  1. Open Customers page.
  2. Fill the postalCode to the search field
  3. Assert customer row is present in the table. 
  4. Assert no other rows is present in the table.
  */
<<<<<<< HEAD

  const addCustomer = new AddCustomerPage(page);
  const customersList = new CustomersListPage(page);
  await addCustomer.openAccount();

  await customersList.open();
  await customersList.customerSearchField(postCode);

  await customersList.lastCustomerPostCode(postCode);
  await customersList.assertOnlyOneRowPresent();
=======
>>>>>>> 4f8d19e51ffb87cb39198b080971d4371cd52afd
});
