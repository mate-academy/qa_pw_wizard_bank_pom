import { expect } from '@playwright/test';

export class CustomerAccountPage {
  constructor(page) {
    this.page = page;
    this.userNameHeading = page.locator('.fontBig');
    this.accountIdDropDown = page.getByTestId('accountSelect');
    this.accountDataLine = page
      .locator('div')
      .filter({
        hasText: 'Account Number',
      })
      .first();
    this.depositButton = page.getByRole('button', { name: 'Deposit' });
    this.transactionsButton = page.getByRole('button', {
      name: 'Transactions',
    });
    this.withdrawlButton = page.getByRole('button', { name: 'Withdraw' });
    this.withdrawalButton = this.withdrawlButton;
    this.amountInputField = page.getByPlaceholder('amount');
    this.depositFormButton = page.getByRole('form').getByRole('button', {
      name: 'Deposit',
    });
    this.depositSuccessfulMessage = page.getByText('Deposit Successful');
    this.withdrawlFormButton = page.getByRole('form').getByRole('button', {
      name: 'Withdraw',
    });
    this.withdrawalFormButton = this.withdrawlFormButton;
    this.withdrawNoBalanceErrorMessage = page.getByText(
      'Transaction Failed. You can not withdraw amount more than the balance.',
    );
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/account');
  }

  async selectAccount(accountNumber) {
    await this.accountIdDropDown.selectOption(accountNumber);
  }

  async assertAccountIdInDropDownHasValue(value) {
    const accountNumberInDrodown = this.accountIdDropDown;
    await expect(accountNumberInDrodown).toHaveValue(value);
  }

  async assertAccountLineContainsText(text) {
    await expect(this.accountDataLine).toContainText(text);
  }

  async assertAccountNumber(accountNumber) {
    await expect(this.accountDataLine).toContainText(`Account Number : ${accountNumber}`);
  }

  async assertBalance(balance) {
    await expect(this.accountDataLine).toContainText(`Balance : ${balance}`);
  }

  async assertCurrency(currency) {
    await expect(this.accountDataLine).toContainText(`Currency : ${currency}`);
  }

  async clickDepositButton() {
    await this.depositButton.click();
  }

  async clickTransactionsButton() {
    await this.transactionsButton.click();
  }

  async clickWithdrawlButton() {
    await this.withdrawlButton.click();
  }

  // Alias for proper spelling
  async clickWithdrawalButton() {
    await this.clickWithdrawlButton();
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

  // Alias for proper spelling
  async clickWithdrawalFormButton() {
    await this.clickWithdrawlFormButton();
  }

  async clickLogoutButton() {
    await this.logoutButton.click();
  }

  async assertLogoutButtonIsVisible() {
    await expect(this.logoutButton).toBeVisible();
  }

  async assertCustomerNameIsVisible(name) {
    await expect(this.userNameHeading).toContainText(name);
  }

  async assertDepositSuccessfulMessageIsVisible() {
    await expect(this.depositSuccessfulMessage).toBeVisible();
  }

  async assertWithdrawNoBalanceErrorMessageIsVisible() {
    await expect(this.withdrawNoBalanceErrorMessage).toBeVisible();
  }
}
