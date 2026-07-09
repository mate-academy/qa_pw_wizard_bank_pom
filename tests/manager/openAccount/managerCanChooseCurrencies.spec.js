import { test } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage'

test('Assert manager can choose currencies for account', async ({ page }) => {
	/* 
  Test:
  1. Open the Open account page 
    https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
  2. Select currency Dollar
  3. Assert the drop-down has value Dollar
  4. Select currency Pound
  5. Assert the drop-down has value Pound
  6. Select currency Rupee
  7. Assert the drop-down has value Rupee
  */

	const openAccountPage = new OpenAccountPage(page)

	// Open the Open account page https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager/openAccount
	await openAccountPage.open()

	// Select currency Dollar
	await openAccountPage.selectDropdownElement('currency', 'Dollar')

	// Assert the drop-down has value Dollar
	await openAccountPage.assertSelectDropdownContainsValue('currency', 'Dollar')

	// Select currency Pound
	await openAccountPage.selectDropdownElement('currency', 'Pound')

	// Assert the drop-down has value Pound
	await openAccountPage.assertSelectDropdownContainsValue('currency', 'Pound')

	// Select currency Rupee
	await openAccountPage.selectDropdownElement('currency', 'Rupee')

	// Assert the drop-down has value Rupee
	await openAccountPage.assertSelectDropdownContainsValue('currency', 'Rupee')
})
