import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager cannot open account without selecting a customer', async ({
  page,
}) => {
  /* 
  Test:
  1. Open the Open account page
  2. Click [Process] without selecting a customer
  3. Assert the customer drop-down is invalid (required, not selected)
  */
  const openAccountPage = new OpenAccountPage(page);

  await openAccountPage.open();
  await openAccountPage.clickProcessButton();
  await openAccountPage.assertCustomerDropDownIsInvalid();
});