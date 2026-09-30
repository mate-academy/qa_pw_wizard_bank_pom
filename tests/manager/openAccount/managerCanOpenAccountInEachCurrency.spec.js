import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage';

const currencies = ['Dollar', 'Pound', 'Rupee'];

for (const currency of currencies) {
  test(`Assert customer sees account opened in ${currency}`, async ({
    page,
  }) => {
    /*
    Test:
    1. Open Add Customer page and add a new customer.
    2. Reload the page (This is a simplified step to close the popup).
    3. Open the Open Account page.
    4. Select the new customer and the currency.
    5. Click [Process].
    6. Click [Home].
    7. Click [Customer Login].
    8. Select the new customer and click [Login].
    9. Assert the account line contains the selected currency.
    10. Assert the account line contains zero balance.
    */
    const bankHomePage = new BankHomePage(page);
    const addCustomerPage = new AddCustomerPage(page);
    const openAccountPage = new OpenAccountPage(page);
    const customerLoginPage = new CustomerLoginPage(page);
    const accountPage = new CustomerAccountPage(page);

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const customerName = `${firstName} ${lastName}`;

    await addCustomerPage.open();
    await addCustomerPage.fillFirstName(firstName);
    await addCustomerPage.fillLastName(lastName);
    await addCustomerPage.fillPostalCode(faker.location.zipCode());
    await addCustomerPage.clickAddCustomer();
    await page.reload();
    await openAccountPage.open();
    await openAccountPage.selectCustomer(customerName);
    await openAccountPage.selectCurrency(currency);
    await openAccountPage.clickProcessButton();
    await bankHomePage.clickHomeButton();
    await bankHomePage.clickCustomerLoginButton();
    await customerLoginPage.selectCustomer(customerName);
    await customerLoginPage.clickLoginButton();
    await accountPage.assertAccountLineContainsText(`Currency : ${currency}`);
    await accountPage.assertAccountLineContainsText('Balance : 0');
  });
}
