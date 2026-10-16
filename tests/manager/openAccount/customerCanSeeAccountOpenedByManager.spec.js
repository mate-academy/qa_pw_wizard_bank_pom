import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Assert customer can see account opened by manager', async ({ page }) => {

    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const bankHomePage = new BankHomePage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postCode = faker.location.zipCode();

    await addCustomerPage.open();
    await addCustomerPage.fillFieldFirstName(firstName);
    await addCustomerPage.fillFieldLastName(lastName);
    await addCustomerPage.fillFieldPostalCode(postCode);
    await addCustomerPage.clickAddCustomerButton();
    await addCustomerPage.reload();
    await addCustomerPage.clickOpenAccountButton();

    await openAccountPage.selectCustomer(firstName, lastName);
    await openAccountPage.selectCurrency('Dollar');
    await openAccountPage.clickProcessButton();

    await bankHomePage.open();
    await bankHomePage.clickCustomerLoginButton();
    await customerLoginPage.selectCustomer(`${firstName} ${lastName}`);
    await customerLoginPage.clickLoginButton();
    await accountPage.assertWelcomeNameIsVisible(firstName, lastName);
    await accountPage.assertAccountLineContainsText('Currency : Dollar');
    await accountPage.assertAccountLineContainsText('Balance : 0');

});