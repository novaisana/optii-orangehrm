import { test as base } from "./login.fixture";
import { SidebarPage } from "../pages/side-bar.page";
import { DashboardPage } from "../pages/dashboard.page";
import { extractProperty, expect } from "../utilities/fixture-utility";
import { sidebarUrlsLinksTestData } from "../enums/side-bar.enum";

export const sidebarSearchTestData: string[] = extractProperty(
  sidebarUrlsLinksTestData,
  "link_name",
);

// Extended test fixtures
export const test = base.extend<{
  sidebarPage: SidebarPage;
  dashboardPage: DashboardPage;
}>({
  sidebarPage: async ({ authenticatedPage }, use) => {
    const sidebarPage = new SidebarPage(authenticatedPage);
    const dashboardPage = new DashboardPage(authenticatedPage);
    await dashboardPage.waitForPageLoad();
    await use(sidebarPage);
  },
  dashboardPage: async ({ authenticatedPage }, use) => {
    const dashboardPage = new DashboardPage(authenticatedPage);
    await dashboardPage.waitForPageLoad();
    await use(dashboardPage);
  },
});

export { expect };
