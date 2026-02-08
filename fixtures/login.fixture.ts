import { LoginPage } from "../pages/login.page";
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
    username: 'Admin',
    password: 'admin123'
  },
  invalidCredentials: {
    invalidUsername: {
      username: 'InvalidUser',
      password: 'admin123'
    },
    invalidPassword: {
      username: 'Admin',
      password: 'InvalidPassword'
    }
  }
  
};
export const test = base.extend<{ authenticatedPage: Page }>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);
    await use(page);
  },
});