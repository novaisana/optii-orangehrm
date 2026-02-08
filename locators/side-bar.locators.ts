import { Page } from '@playwright/test';

export class SidebarLocators {
  constructor(private page: Page) {}

  get sidebarPanel() {
    return this.page.locator('.oxd-sidepanel');
  }

  get sidebarBody() {
    return this.page.locator('.oxd-sidepanel-body');
  }

  get searchInput() {
    return this.page.getByPlaceholder('Search');
  }

  get mainMenu() {
    return this.page.locator('ul.oxd-main-menu');
  }

  getSidebarLink(linkName: string) {
    return this.page.getByRole('link', { name: linkName });
  }

  get allMenuItems() {
    return this.page.locator('.oxd-main-menu-item');
  }

  get adminLink() {
    return this.page.getByRole('link', { name: 'Admin' });
  }

  get pimLink() {
    return this.page.getByRole('link', { name: 'PIM' });
  }

  get leaveLink() {
    return this.page.getByRole('link', { name: 'Leave' });
  }

  get timeLink() {
    return this.page.getByRole('link', { name: 'Time' });
  }

  get recruitmentLink() {
    return this.page.getByRole('link', { name: 'Recruitment' });
  }

  get myInfoLink() {
    return this.page.getByRole('link', { name: 'My Info' });
  }

  get performanceLink() {
    return this.page.getByRole('link', { name: 'Performance' });
  }

  get dashboardLink() {
    return this.page.getByRole('link', { name: 'Dashboard' });
  }

  get directoryLink() {
    return this.page.getByRole('link', { name: 'Directory' });
  }

  get maintenanceLink() {
    return this.page.getByRole('link', { name: 'Maintenance' });
  }

  get claimLink() {
    return this.page.getByRole('link', { name: 'Claim' });
  }

  get buzzLink() {
    return this.page.getByRole('link', { name: 'Buzz' });
  }

  getPageHeading(headingText: string) {
    return this.page.getByRole('heading', { name: headingText });
  }

  get breadcrumb() {
    return this.page.locator('.oxd-topbar-header-breadcrumb');
  }

  get collapseToggle() {
    return this.page.locator('.oxd-sidepanel-header button');
  }
}
