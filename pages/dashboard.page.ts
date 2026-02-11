import { Page, expect } from "@playwright/test";
import { DashboardLocators } from "../locators/dashboard.locators";

export type WidgetType = "widget" | "section";

const widgetNameMap: Record<string, string> = {
  "Time at Work": "Time at Work",
  "My Actions": "My Actions",
  "Quick Launch": "Quick Launch",
  "Buzz Latest Posts": "Buzz Latest Posts",
  "Employees on Leave Today": "Employees on Leave Today",
  "Employee Distribution by Sub Unit": "Employee Distribution by Sub Unit",
};

export class DashboardPage {
  private locators: DashboardLocators;
  private readonly expectedUrl = /.*\/dashboard\/index$/;

  constructor(private page: Page) {
    this.locators = new DashboardLocators(page);
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForURL(this.expectedUrl);
    await this.locators.dashboardHeading.waitFor({ state: "visible" });
  }

  async verifyRedirectToDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(this.expectedUrl);
  }

  async verifyDashboardVisible(): Promise<void> {
    await expect(this.locators.dashboardHeading).toBeVisible();
    await expect(this.locators.dashboardHeading).toHaveText("Dashboard");
  }

  async verifyUserAuthenticated(): Promise<void> {
    await expect(this.locators.userDropdown).toBeVisible();
  }

  async verifySidebarVisible(): Promise<void> {
    await expect(this.locators.sidebarNavigation).toBeVisible();
  }

  async verifyDashboardWidgetsVisible(): Promise<void> {
    await expect(this.locators.dashboardWidgetsContainer).toBeVisible();
    await expect(this.locators.timeAtWorkWidget).toBeVisible();
  }

  async clickLogoutButton(): Promise<void> {
    await this.locators.userDropdownTrigger.click();
    await this.locators.logoutLink.waitFor({ state: "visible" });
    await this.locators.logoutLink.click();
    await this.page.waitForURL(/.*\/auth\/login$/);
  }

  async verifySuccessfulLogin(): Promise<void> {
    await this.waitForPageLoad();
    await this.verifyRedirectToDashboard();
    await this.verifyDashboardVisible();
    await this.verifyUserAuthenticated();
  }

  async verifyWidgetVisible(
    widgetName: string,
    widgetType: WidgetType,
  ): Promise<void> {
    const actualWidgetName = widgetNameMap[widgetName] || widgetName;
    const widgetLocator = this.locators.widgetByName(actualWidgetName);
    await expect(widgetLocator).toBeVisible();

    if (widgetType === "section" && widgetName === "Quick Launch") {
      await expect(this.locators.quickLaunchPanel).toBeVisible();
    }
  }
}
