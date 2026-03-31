import { test } from '@playwright/test';

import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('customer can login to created account', async ({ page }) => {
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customerLoginPage = new CustomerLoginPage(page); 
    const customerAccountPage = new CustomerAccountPage(page);

    let firstName = faker.person.firstName();
    let lastName = faker.person.lastName();
    let postCode = faker.location.zipCode();

    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostCode(postCode);
    await addCustomerPage.addCustomer();
    await openAccountPage.open();
    await openAccountPage.selectCustomer(firstName, lastName);
    await openAccountPage.selectCurrency('Pound');
    await openAccountPage.clickProcessButton();
    await openAccountPage.reloadPage();
    await customerLoginPage.open();
    await customerLoginPage.waitForOpened();
    await customerLoginPage.selectCustomer(firstName + ' ' + lastName);
    await customerLoginPage.clickLoginButton();
    await customerAccountPage.assertCorrectCustomerNameIsVisible(firstName + ' ' + lastName);
  
});