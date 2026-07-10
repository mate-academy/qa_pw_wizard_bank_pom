import { expect } from '@playwright/test';

export class CustomerAccountPage {
  constructor(page) {
    this.page = page;
    this.dropDownAccountId = page.getByTestId('accountSelect');
    this.accountDataLines = page.locator('div').filter({hasText: 'Account Number'});

    this.depositButton = page.getByRole('button', { name: 'Deposit' });
    this.transactionsButton = page.getByRole('button', {name: 'Transactions'});
    this.withdrawlButton = page.getByRole('button', { name: 'Withdrawl' });

    this.amountField = page.getByPlaceholder('amount');
    this.depositFormButton = page.getByRole('form').getByRole('button', {name: 'Deposit'});
    this.depositSuccessfulMessage = page.getByText('Deposit Successful');
    this.withdrawlFormButton = page.getByRole('form').getByRole('button', {name: 'Withdraw'});

    this.withdrawNoBalanceErrorMessage = page.getByText('Transaction Failed. You can not withdraw amount more than the balance.');
    this.logoutButton = page.getByRole('button', { name: 'Logout' });
    this.accountNumberText = page.getByText('Account Number :');
    this.balanceText = page.getByText('Balance :');
    this.currencyText = page.getByText('Currency :');
  }

  async open() {
    await this.page.goto('angularJs-protractor/BankingProject/#/account');
  }
};