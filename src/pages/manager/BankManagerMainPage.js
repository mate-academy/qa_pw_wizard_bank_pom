import { expect } from '@playwright/test'

export class BankManagerMainPage {
	constructor(page) {
		this.page = page
	}

	async open() {
		await this.page.goto('/angularJs-protractor/BankingProject/#/login')
	}

	getButtonByName(name) {
		return this.page.getByRole('button', {
			name: name,
		})
	}
	async clickOnButtonByName(name) {
		await this.getButtonByName(name).click()
	}

	async assertVisibilityButtonByName(name) {
		await expect(this.getButtonByName(name)).toBeVisible()
	}
}
