import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { SidebarPage } from "../pages/side-bar.page";
import { test as base, Page } from "@playwright/test";
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface TestData {
  validCredentials: LoginCredentials;
  invalidCredentials: {
    invalidUsername: LoginCredentials;
    invalidPassword: LoginCredentials;
  };
}

export const testData: TestData = {
  validCredentials: {
    username: process.env.VALID_USERNAME || "Admin",
    password: process.env.VALID_PASSWORD || "admin123",
  },
  invalidCredentials: {
    invalidUsername: {
      username: process.env.INVALID_USERNAME || "InvalidUser",
      password: process.env.VALID_PASSWORD || "admin123",
    },
    invalidPassword: {
      username: process.env.VALID_USERNAME || "Admin",
      password: process.env.INVALID_PASSWORD || "InvalidPassword",
    },
  },
};

export const test = base.extend<{
  authenticatedPage: Page;
  sidebarPage: SidebarPage;
  dashboardPage: DashboardPage;
}>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);
    await loginPage.goto();
    await loginPage.login(
      testData.validCredentials.username,
      testData.validCredentials.password,
    );
    await dashboardPage.waitForPageLoad();
    await use(page);
  },
  sidebarPage: async ({ authenticatedPage }, use) => {
    const sidebarPage = new SidebarPage(authenticatedPage);
    await use(sidebarPage);
  },
  dashboardPage: async ({ authenticatedPage }, use) => {
    const dashboardPage = new DashboardPage(authenticatedPage);
    await use(dashboardPage);
  },
});

export { expect } from "../utilities/fixture-utility";
