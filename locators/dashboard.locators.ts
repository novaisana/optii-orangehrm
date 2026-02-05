import { Page } from '@playwright/test';

export class DashboardLocators {
  constructor(private page: Page) {}


  get dashboardHeading() {
    return this.page.getByRole('heading', { name: 'Dashboard' });
  }

  get dashboardContainer() {
    return this.page.locator('.oxd-dashboard');
  }

  get userDropdown() {
    return this.page.locator('.oxd-userdropdown');
  }

  get userDropdownTrigger() {
    return this.page.locator('.oxd-userdropdown-tab');
  }

  get logoutLink() {
    return this.page.getByRole('menuitem', { name: 'Logout' });
  }

  get sidebarNavigation() {
    return this.page.locator('.oxd-sidepanel');
  }

  get quickLaunchPanel() {
    return this.page.locator('.orangehrm-quick-launch');
  }

  get timeAtWorkWidget() {
    return this.page.locator('.oxd-sheet').filter({ hasText: 'Time at Work' });
  }
}
