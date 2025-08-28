import { expect } from '@playwright/test';

export class CustomerAccountPage {
  constructor(page) {
    this.page = page;
    this.accountIdDropDown = page.getByTestId('accountSelect');
    this.accountDataLine = page.locator('div', { hasText: 'Account Number' }).first();

    this.depositButton = page.getByRole('button', { name: 'Deposit' });
    this.transactionsButton = page.getByRole('button', { name: /Transactions/i });
    this.withdrawlButton = page.getByRole('button', { name: 'Withdraw' });

    this.amountInputField = page.getByPlaceholder('amount');

    this.depositFormButton = page.getByRole('form').getByRole('button', { name: 'Deposit' });
    this.withdrawlFormButton = page.getByRole('form').getByRole('button', { name: 'Withdraw' });

    this.depositSuccessfulMessage = page.getByText('Deposit Successful');
    this.withdrawNoBalanceErrorMessage = page.getByText(
      'Transaction Failed. You can not withdraw amount more than the balance.'
    );

    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/account');
  }

  async assertAccountIdInDropDownHasValue(value) {
    await expect(this.accountIdDropDown).toHaveValue(value);
  }

  async assertAccountLineContainsText(text) {
    await expect(this.accountDataLine).toContainText(text);
  }

  async clickDepositButton() {
    await this.depositButton.click();
  }

  async clickTransactionsButton() {
    const nav = this.page.waitForURL('**/#/listTx', { timeout: 15000 }).catch(() => null);
    await this.transactionsButton.click();
    await nav;

    if (!this.page.url().includes('#/listTx')) {
      await this.page.goto('/angularJs-protractor/BankingProject/#/listTx');
      await this.page.waitForURL('**/#/listTx', { timeout: 15000 });
    }
  }

  async clickWithdrawlButton() {
    await this.withdrawlButton.click();
  }

  async fillAmountInputField(amount) {
    await this.amountInputField.fill(amount);
  }

  async clickDepositFormButton() {
    await this.depositFormButton.click();
  }

  async clickWithdrawlFormButton() {
    await this.withdrawlFormButton.click();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async assertDepositSuccessfulMessageIsVisible() {
    await expect(this.depositSuccessfulMessage).toBeVisible();
  }

  async assertWithdrawNoBalanceErrorMessageIsVisible() {
    await expect(this.withdrawNoBalanceErrorMessage).toBeVisible();
  }
}

