import { Page, expect } from '@playwright/test';
import { SidebarLocators } from '../locators/side-bar.locators';
import { testData } from '../fixtures/login.fixture';
import { pagesUrlPath } from '../enums/side-bar.enum';

export class SidebarPage {
  private locators: SidebarLocators;
  private expectedLinks: string[];

  constructor(private page: Page) {
    this.locators = new SidebarLocators(page);
    this.expectedLinks = ['Admin', 'PIM', 'Leave', 'Time', 'Recruitment',
                          'My Info', 'Performance', 'Dashboard', 'Directory',
                          'Maintenance', 'Claim', 'Buzz'];

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

    const pageInfo = pagesUrlPath[expectedPage] || pagesUrlPath[Object.keys(pagesUrlPath).find(key =>
      pagesUrlPath[key].heading === expectedPage
    ) || ''];

    if (pageInfo) {
      await this.page.waitForLoadState('domcontentloaded');
      if (expectedPage === 'Maintenance') {
        const passwordInput = this.page.locator('input[type="password"]');
        try {
          await passwordInput.waitFor({ state: 'visible', timeout: 5000 });
          await passwordInput.fill(testData.validCredentials.password);
          const confirmButton = this.page.getByRole('button', { name: 'Confirm' });
          await confirmButton.click();
          await this.page.waitForURL(pageInfo.urlPattern);
          await this.page.waitForLoadState('domcontentloaded');
        } catch {
          // Password dialog may not appear if already authenticated
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

  async verifySearchCleanUp(): Promise<void> {
    await expect(this.locators.searchInput).toBeEmpty();
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

    for (const linkName of this.expectedLinks) {
      await this.verifyLinkIsDisplayed(linkName);
    }
  }

  getExpectedPageInfo(linkName: string) {
    return pagesUrlPath[linkName];
  }
}
