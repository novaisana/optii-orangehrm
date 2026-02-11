import { Page } from "@playwright/test";

export class LoginLocators {
  constructor(private page: Page) {}

  get usernameInput() {
    return this.page.getByPlaceholder("Username");
  }

  get passwordInput() {
    return this.page.getByPlaceholder("Password");
  }

  get loginButton() {
    return this.page.getByRole("button", { name: "Login" });
  }

  get errorMessage() {
    return this.page.locator(".oxd-alert-content-text");
  }

  get usernameValidationError() {
    return this.page
      .locator(".oxd-input-group")
      .filter({ has: this.page.getByPlaceholder("Username") })
      .locator(".oxd-input-field-error-message");
  }

  get passwordValidationError() {
    return this.page
      .locator(".oxd-input-group")
      .filter({ has: this.page.getByPlaceholder("Password") })
      .locator(".oxd-input-field-error-message");
  }

  get loginForm() {
    return this.page.locator("form");
  }
}
