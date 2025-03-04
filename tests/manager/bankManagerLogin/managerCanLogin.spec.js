import { test } from '@playwright/test';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage'

test('Assert manager can Login ', async ({ page }) => {
    const managerPage = new BankManagerMainPage(page);
    await managerPage.ManagerLogin();
    await managerPage.checkManagerPageElements();
});