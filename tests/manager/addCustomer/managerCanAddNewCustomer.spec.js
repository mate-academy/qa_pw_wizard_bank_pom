import { test } from '@playwright/test';
import { Faker, faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can add new customer', async ({ page }) => {
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
10. As customer in the table in the last row. 
sert the Postal Code of the customer is present in the table in the last row. 
11. Assert there is no account number for the new
Tips:
1. Use faker for test data generation, example:
usage:
 const firstName = faker.person.firstName();
 const lastName = faker.person.LastName();
 const postCode = faker.location.zipCode(); 

 2. Do not rely on the customer row id for the steps 8-11. Use the ".last()" locator to get the last row.
*/
    const customer = {
        firstName : faker.person.firstName(),
        lastName : faker.person.lastName(),
        postCode : faker.location.zipCode()
    }

    const addCustomerPage = new AddCustomerPage(page);
    const customerListPage = new CustomersListPage(page);

    await addCustomerPage.open();
    await addCustomerPage.fillFirstNameField(customer.firstName);
    await addCustomerPage.fillLastNameField(customer.lastName);
    await addCustomerPage.fillPostCode(customer.postCode);

    await addCustomerPage.clickAddCustomerButton();
    await addCustomerPage.reload();
    await addCustomerPage.clickCustomersTab();

    await customerListPage.waitForLoading();
    await customerListPage.checkCustomerDetails(customer.firstName, customer.lastName, customer.postCode);

});