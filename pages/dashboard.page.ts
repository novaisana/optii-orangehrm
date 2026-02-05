import { Page, expect } from '@playwright/test';
import { DashboardLocators } from '../locators/dashboard.locators';

export class DashboardPage {
  private locators: DashboardLocators;
  private readonly expectedUrl = /.*\/dashboard\/index$/;

  constructor(private page: Page) {
    this.locators = new DashboardLocators(page);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForURL(this.expectedUrl);
    await this.locators.dashboardHeading.waitFor({ state: 'visible' });
  }

  async verifyRedirectToDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(this.expectedUrl);
  }

  async verifyDashboardVisible(): Promise<void> {
    await expect(this.locators.dashboardHeading).toBeVisible();
    await expect(this.locators.dashboardHeading).toHaveText('Dashboard');
  }

  async verifyUserAuthenticated(): Promise<void> {
    await expect(this.locators.userDropdown).toBeVisible();
  }

  async getDashboardHeading(): Promise<string> {
    return await this.locators.dashboardHeading.textContent() || '';
  }

  async verifySidebarNavigationAccessible(): Promise<void> {
    await expect(this.locators.sidebarNavigation).toBeVisible();
  }

  async clickLogoutButton(): Promise<void> {
    await this.locators.userDropdownTrigger.click();
    await this.locators.logoutLink.waitFor({ state: 'visible' });
    await this.locators.logoutLink.click();
  }

  async logout(): Promise<void> {
    await this.clickLogoutButton();
  }

  async verifySuccessfulLogin(): Promise<void> {
    await this.waitForPageLoad();
    await this.verifyRedirectToDashboard();
    await this.verifyDashboardVisible();
    await this.verifyUserAuthenticated();
  }
}
