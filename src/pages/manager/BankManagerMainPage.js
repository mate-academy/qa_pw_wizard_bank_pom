import { expect } from '@playwright/test';
import { ManagerNavigation } from '../../components/managerNavigation';

export class BankManagerMainPage {
  static URL = '/angularJs-protractor/BankingProject/#/manager';

  constructor(page) {
    this.page = page;
    this.navigation = new ManagerNavigation(page);
  }

  async open() {
    await this.page.goto(this.constructor.URL);
    await this.waitForOpened();
  }

  async waitForOpened() {
    await this.page.waitForURL(this.constructor.URL);
  }

  /** asserts that page is open by checking manager's navigation's visibility */
  async assertPageOpen() {
    await this.navigation.assertNavigationIsVisible();
  }

  async reload(){
    await this.page.reload();
  }

  /**
   * 
   * @param {'addCustomer'|'openAccount'|'customers'} tab 
   */
  async openPage(tab) {
    await this.navigation.clickTab(tab);
  }
}
