import { expect } from '@playwright/test';
import { BankManagerMainPage } from './BankManagerMainPage';
import { CustomersList } from '../../components/customersTable';

export class CustomersListPage extends BankManagerMainPage {
  static URL = '/angularJs-protractor/BankingProject/#/manager/list';
  
  constructor(page) {
    super(page);
    
    this.customersList = new CustomersList(page);
  }

  async assertCustomer(customer) {
    await this.customersList.assertCustomer(customer);
  }

  async assertNewCustomer(customer) {
    await this.customersList.assertNewCustomer({
      ...customer,
      hasAccount: false,
    });
  }

  async deleteCustomer(customer) {
    await this.customersList.deleteCustomer(customer);
  }

  async assertCustomerNotPresent(customer) {
    await this.customersList.assertCustomerNotPresent(customer);
  }

  async searchCustomer(text) {
    await this.customersList.search(text);
  }

  async clearSearch() {
    await this.customersList.clearSearch();
  }
}
