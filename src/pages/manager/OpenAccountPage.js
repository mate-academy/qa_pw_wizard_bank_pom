import { expect } from '@playwright/test'

export class OpenAccountPage {
	constructor(page) {
		this.page = page
		this.rowLocator = (name) =>
			this.page.getByRole('row').filter({ hasText: name })
	}

	async open() {
		await this.page.goto(
			'/angularJs-protractor/BankingProject/#/manager/openAccount',
		)
	}

	async reload() {
		await this.page.reload()
	}

	getElemByTestId(id) {
		return this.page.getByTestId(id)
	}

	async selectDropdownElement(id, value) {
		await this.getElemByTestId(id).selectOption(value)
	}

	getButtonByRole(name) {
		return this.page.getByRole('button', { name: name })
	}

	async clickOnButtonByRole(name) {
		await this.getButtonByRole(name).click()
	}

	async assertSelectDropdownContainsValue(id, value) {
		await expect(this.getElemByTestId(id)).toHaveValue(value)
	}

	async assertAccountCellNotEmpty(name) {
		await expect(
			this.rowLocator(name).locator(this.page.getByRole('cell').nth(3)),
		).not.toBeEmpty()
	}
}
