import { test } from "@playwright/test";
import { LoginPage, VALIDATION_MESSAGES } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { testData } from "../fixtures/login.fixture";

test.describe(
  "Feature: Login",
  { tag: ["@smoke", "@regression", "@login"] },
  () => {
    let loginPage: LoginPage;
    let dashboardPage: DashboardPage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      dashboardPage = new DashboardPage(page);
      await loginPage.goto();
    });

    test("Verify successful login with valid credentials", async () => {
      await loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password,
      );
      await dashboardPage.verifySuccessfulLogin();
    });

    test("Verify login with invalid username", async () => {
      await loginPage.login(
        testData.invalidCredentials.invalidUsername.username,
        testData.invalidCredentials.invalidUsername.password,
      );
      await loginPage.verifyErrorMessage("Invalid credentials");
    });

    test("Verify login with invalid password", async () => {
      await loginPage.login(
        testData.invalidCredentials.invalidPassword.username,
        testData.invalidCredentials.invalidPassword.password,
      );
      await loginPage.verifyErrorMessage("Invalid credentials");
    });

    test("Verify if user can logout successfully", async () => {
      await loginPage.login(
        testData.validCredentials.username,
        testData.validCredentials.password,
      );
      await dashboardPage.verifySuccessfulLogin();
      await dashboardPage.clickLogoutButton();
      await loginPage.verifyLoginPageVisible();
    });

    test("Verify login with empty credentials", async () => {
      await loginPage.clickLoginButton();
      await loginPage.verifyFieldValidationError(
        "username",
        VALIDATION_MESSAGES.REQUIRED,
      );
      await loginPage.verifyFieldValidationError(
        "password",
        VALIDATION_MESSAGES.REQUIRED,
      );
    });

    test("Verify login with empty username", async () => {
      await loginPage.enterPassword(
        testData.validCredentials.password,
      );
      await loginPage.clickLoginButton();
      await loginPage.verifyFieldValidationError(
        "username",
        VALIDATION_MESSAGES.REQUIRED,
      );
      await loginPage.verifyFieldValidationErrorNotVisible("password");
    });

    test("Verify login with empty password", async () => {
      await loginPage.enterUsername(
        testData.validCredentials.username,
      );
      await loginPage.clickLoginButton();
      await loginPage.verifyFieldValidationError(
        "password",
        VALIDATION_MESSAGES.REQUIRED,
      );
      await loginPage.verifyFieldValidationErrorNotVisible("username");
    });
  },
);
