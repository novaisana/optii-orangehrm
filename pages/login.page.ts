import { Page, expect } from '@playwright/test';
import { LoginLocators } from '../locators/login.locators';

export class LoginPage {
  private locators: LoginLocators;
  private readonly url = process.env.BASE_URL!;

  constructor(private page: Page) {
    this.locators = new LoginLocators(page);
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.waitForPageLoad();
  }

  async waitForPageLoad(): Promise<void> {
    await this.locators.loginForm.waitFor({ state: 'visible' });
    await this.locators.usernameInput.waitFor({ state: 'visible' });
  }

  async enterUsername(username: string): Promise<void> {
    await this.locators.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.locators.passwordInput.fill(password);
  }

  async clickLoginButton(): Promise<void> {
    await this.locators.loginButton.click();
  }

  async login(username: string, password: string): Promise<void> {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  async verifyErrorMessage(expectedMessage: string): Promise<void> {
    await expect(this.locators.errorMessage).toBeVisible();
    await expect(this.locators.errorMessage).toHaveText(expectedMessage);
  }

  async verifyLoginPageVisible(): Promise<void> {
    await expect(this.locators.loginForm).toBeVisible();
    await expect(this.locators.usernameInput).toBeVisible();
    await expect(this.locators.passwordInput).toBeVisible();
    await expect(this.locators.loginButton).toBeVisible();
  }
}
