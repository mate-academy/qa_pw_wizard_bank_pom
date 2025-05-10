import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/OpenAccountPage'

test('Assert manager can choose currencies for account', async ({ page }) => {
    const managerPage = new BankManagerMainPage(page);
    const accountPage = new AddCustomerPage(page);
    await managerPage.ManagerLogin();
    await accountPage.openAccountPage();
    await accountPage.selectDollarCurrency();
    await accountPage.selectPoundCurrency();
    await accountPage.selectRupeeCurrency();
});