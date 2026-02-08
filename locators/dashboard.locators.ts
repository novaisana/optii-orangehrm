import { Page, Locator } from "@playwright/test";

export class DashboardLocators {
  constructor(private page: Page) {}

  get dashboardHeading() {
    return this.page.getByRole("heading", { name: "Dashboard" });
  }

  get userDropdown() {
    return this.page.locator(".oxd-userdropdown");
  }

  get userDropdownTrigger() {
    return this.page.locator(".oxd-userdropdown-tab");
  }

  get logoutLink() {
    return this.page.getByRole("menuitem", { name: "Logout" });
  }

  get sidebarNavigation() {
    return this.page.locator(".oxd-sidepanel");
  }

  get dashboardWidgetsContainer() {
    return this.page.locator(".oxd-layout-context");
  }

  // Widget locators using oxd-sheet class for specificity (avoids matching grid-items)
  get timeAtWorkWidget() {
    return this.page.locator(".oxd-sheet.orangehrm-dashboard-widget").filter({
      has: this.page.locator(".orangehrm-dashboard-widget-name", {
        hasText: "Time at Work",
      }),
    });
  }

  get quickLaunchPanel() {
    return this.page.locator(".orangehrm-quick-launch");
  }

  widgetByName(widgetName: string): Locator {
    return this.page.locator(".oxd-sheet.orangehrm-dashboard-widget").filter({
      has: this.page.locator(".orangehrm-dashboard-widget-name", {
        hasText: widgetName,
      }),
    });
  }
}
