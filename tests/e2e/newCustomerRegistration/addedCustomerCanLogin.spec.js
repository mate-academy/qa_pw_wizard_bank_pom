import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

test('Added customer can login', async ({ page }) => {

    const bankHomePage = new BankHomePage(page);
    const bankManagerMainPage = new BankManagerMainPage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customersListPage = new CustomersListPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const customerAccountPage = new CustomerAccountPage(page);

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const postCode = faker.location.zipCode(); 

    //1. Go to Bank Home page
    await bankHomePage.open();
    //2. Click Bank Manager Login
    await bankHomePage.clickBankManagerLogin();
    //3. Add Customer button
    await bankManagerMainPage.clickAddCustomersButton();
    //4. Fill customer data and click Add Customer button
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(postCode);
    await addCustomerPage.clickAddCustomerButton();
    //5. Open account for created customer(select currency)
    await bankManagerMainPage.clickOpenAccountButton();
    await openAccountPage.selectCustomer(firstName, lastName);
    await openAccountPage.selectCurrency('Dollar');
    await openAccountPage.clickProcessButton();
    //6. Go to customers list and check that new customer has Account Number
    await bankManagerMainPage.clickCustomersButton();
    await customersListPage.assertCustomerExist(firstName, lastName);
    await customersListPage.assertAccountNumberIsNotEmpty();
    //7. Go to Home page and login under new customer
    await bankHomePage.clickHomeButton();
    await bankHomePage.clickCustomerLoginButton();
    await customerLoginPage.selectCustomer(`${firstName} ${lastName}`);
    await customerLoginPage.clickLoginButton();
    await customerAccountPage.assertAccountLineContainsText(`${firstName} ${lastName}`);
    

})