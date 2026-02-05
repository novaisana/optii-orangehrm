import { test } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { testData } from '../fixtures/testData.fixture';


test.describe('Feature: Login', () => {
  let loginPage: LoginPage;
  let dashboardPage: DashboardPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    dashboardPage = new DashboardPage(page);
    await loginPage.goto();
  });

  test('Verify successful login with valid credentials', async () => {
    await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);
    await dashboardPage.verifySuccessfulLogin();
  });

  test('Verify login with invalid username', async () => {
    await loginPage.login(testData.invalidCredentials.invalidUsername.username, testData.invalidCredentials.invalidUsername.password);
    await loginPage.verifyErrorMessage('Invalid credentials');
  });

  test('Verify login with invalid password', async () => {
    await loginPage.login(testData.invalidCredentials.invalidPassword.username, testData.invalidCredentials.invalidPassword.password);
    await loginPage.verifyErrorMessage('Invalid credentials');
  });

  test('Verify if user can logout successfully', async () => {
    await loginPage.login(testData.validCredentials.username, testData.validCredentials.password);
    await dashboardPage.verifySuccessfulLogin();
    await dashboardPage.verifySidebarNavigationAccessible();
    await dashboardPage.clickLogoutButton();
    await loginPage.verifyLoginPageVisible();
  });
});
