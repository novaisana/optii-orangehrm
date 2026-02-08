import { Page, expect } from '@playwright/test';
import { SidebarLocators } from '../locators/sidebar.locators';
import { testData } from '../fixtures/login.fixture';

// Map of link names to their expected page headings/titles and URL patterns
// useUrlVerification: true for pages where heading locators are ambiguous
const linkToExpectedPage: Record<string, { heading: string; urlPattern: RegExp; exactMatch?: boolean; useUrlVerification?: boolean }> = {
  'Admin': { heading: 'System Users', urlPattern: /.*\/admin\/viewSystemUsers$/ },
  'PIM': { heading: 'Employee Information', urlPattern: /.*\/pim\/viewEmployeeList$/ },
  'Leave': { heading: 'Leave List', urlPattern: /.*\/leave\/viewLeaveList$/ },
  'Time': { heading: 'Select Employee', urlPattern: /.*\/time\/viewEmployeeTimesheet$/ },
  'Recruitment': { heading: 'Candidates', urlPattern: /.*\/recruitment\/viewCandidates$/ },
  'My Info': { heading: 'Personal Details', urlPattern: /.*\/pim\/viewPersonalDetails\/empNumber\/\d+$/ },
  'Performance': { heading: 'Manage Reviews', urlPattern: /.*\/performance\/searchEvaluatePerformanceReview$/ },
  'Dashboard': { heading: 'Dashboard', urlPattern: /.*\/dashboard\/index$/, exactMatch: true },
  'Directory': { heading: 'Directory', urlPattern: /.*\/directory\/viewDirectory$/, useUrlVerification: true },
  'Maintenance': { heading: 'Purge Records', urlPattern: /.*\/maintenance\/purgeEmployee$/ },
  'Claim': { heading: 'Claim', urlPattern: /.*\/claim\/viewAssignClaim$/, useUrlVerification: true },
  'Buzz': { heading: 'Buzz', urlPattern: /.*\/buzz\/viewBuzz$/, exactMatch: true }
};

export class SidebarPage {
  private locators: SidebarLocators;

  constructor(private page: Page) {
    this.locators = new SidebarLocators(page);
  }

  async verifySidebarIsVisible(): Promise<void> {
    await expect(this.locators.sidebarPanel).toBeVisible();
    await expect(this.locators.mainMenu).toBeVisible();
  }

  async clickSidebarLink(linkName: string): Promise<void> {
    const link = this.locators.getSidebarLink(linkName);
    await expect(link).toBeVisible();
    await link.click();
  }

  async verifyPageLoadedCorrectly(expectedPage: string): Promise<void> {

    const pageInfo = linkToExpectedPage[expectedPage] || linkToExpectedPage[Object.keys(linkToExpectedPage).find(key =>
      linkToExpectedPage[key].heading === expectedPage
    ) || ''];

    if (pageInfo) {
      await this.page.waitForLoadState('networkidle');
      if (expectedPage === 'Maintenance') {
        const passwordInput = this.page.locator('input[type="password"]');
        const isPasswordDialogVisible = await passwordInput.isVisible().catch(() => false);
        if (isPasswordDialogVisible) {
          await expect(passwordInput).toBeVisible();
          await passwordInput.fill(testData.validCredentials.password);
          const confirmButton = this.page.getByRole('button', { name: 'Confirm' });         
          await confirmButton.click();         
        }
      }
      if (pageInfo.useUrlVerification) {
        await expect(this.page).toHaveURL(pageInfo.urlPattern, { timeout: 10000 });
        return;
      }
      const heading = this.locators.getPageHeading(pageInfo.heading);
      await expect(heading).toBeVisible({ timeout: 10000 });
    }
  }

  async navigateToPage(linkName: string): Promise<void> {
    await this.clickSidebarLink(linkName);
    await this.verifyPageLoadedCorrectly(linkName);
  }

  async searchInSidebar(searchText: string): Promise<void> {
    await this.locators.searchInput.fill(searchText);
  }

  async clearSearch(): Promise<void> {
    await this.locators.searchInput.clear();
    await this.verifySearchCleanUp();
  }

  async verifySearchCleanUp(){
    expect(this.locators.searchInput).toBeEmpty();
  }

  async verifyLinkIsDisplayed(linkName: string): Promise<void> {
    const link = this.locators.getSidebarLink(linkName);
    await expect(link).toBeVisible();
  }

  async verifyLinkIsNotDisplayed(linkName: string): Promise<void> {
    const link = this.locators.getSidebarLink(linkName);
    await expect(link).not.toBeVisible();
  }

  async verifySearchFilterWorks(searchText: string): Promise<void> {
    await this.searchInSidebar(searchText);
    await expect(this.locators.getSidebarLink(searchText)).toBeVisible();
    await this.verifyLinkIsDisplayed(searchText);
    await expect(this.locators.allMenuItems).toHaveCount(1);
    
  }

  async verifyAllSidebarLinksVisible(): Promise<void> {
    const expectedLinks = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment',
                          'My Info', 'Performance', 'Dashboard', 'Directory',
                          'Maintenance', 'Claim', 'Buzz'];

    for (const linkName of expectedLinks) {
      await this.verifyLinkIsDisplayed(linkName);
    }
  }

  getExpectedPageInfo(linkName: string) {
    return linkToExpectedPage[linkName];
  }
}
