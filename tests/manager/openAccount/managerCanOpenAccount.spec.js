import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
//import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

let firstName;
let lastName;

test.beforeEach(async ({ page }) => {

    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);

    firstName = faker.person.firstName(); 
    lastName = faker.person.lastName();
    const postCode = faker.location.zipCode();

    await addCustomerPage.open();
    await addCustomerPage.fillField(addCustomerPage.firstName, firstName);
    await addCustomerPage.fillField(addCustomerPage.lastName, lastName);
    await addCustomerPage.fillField(addCustomerPage.postCode, postCode);
    await addCustomerPage.clickButton(addCustomerPage.formButton);
    await addCustomerPage.reloadPage();
    await openAccountPage.openAccount();
});

test('Assert manager can add new customer', async ({ page }) => {

    const openAccountPage = new OpenAccountPage(page);
    const addCustomerPage = new AddCustomerPage(page);

    //await openAccountPage.openAccount();
    const fullNameCustomer = `${firstName} ${lastName}`;
    await openAccountPage.openDropDownAndNameCustomer(fullNameCustomer);

    await openAccountPage.openDropDownAndSelectCurrency('Dollar');
    await openAccountPage.clickProcessButon();
    await addCustomerPage.reloadPage();

    //await addCustomerPage.clickButton(addCustomerPage.customersButton);
    await openAccountPage.clickCusstomerButon();
    await openAccountPage.assertCustomerAccountNumber();

});
