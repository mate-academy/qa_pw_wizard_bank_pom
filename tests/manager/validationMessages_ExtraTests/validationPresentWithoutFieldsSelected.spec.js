import { test } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert validation message is present when to process without selected Customer and Currency', async ({ page }) => {
  /* 
  Test:
  1. Go to Open Account page.
  2. Click [Process].
  3. Assert the validation message is present on Customer field.
  */
 const openAccountPage = new OpenAccountPage(page);
  await openAccountPage.open();
  await openAccountPage.clickProcessButton();
  await openAccountPage.assertValidationMessageForCustomerNotSelected();
});
