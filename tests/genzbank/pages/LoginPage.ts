import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly signUpLink: Locator;
  readonly emailTextbox: Locator;
  readonly passwordTextBox: Locator;
  readonly signInButton: Locator;
  readonly portfolioLink: Locator;

  constructor(page: Page) {
    super(page);
    this.signUpLink = page.locator(
      'role=link[name="Don\'t have an account? Sign up"]'
    );
    this.emailTextbox = page.locator('input[type="email"]');
    this.passwordTextBox = page.locator('input[type="password"]');
    this.signInButton = page.locator('role = button[name = "Sign in"]');
    this.portfolioLink = page.locator('a[href="/dashboard/main"]');
  }

  async loginWithValidCredentials(email: string, password: string) {
    await this.enterUsernameAndPassword(email, password);
    await this.verifySuccessfulLogin();
  }

  async enterUsernameAndPassword(email: string, password: string) {
    await this.emailTextbox.waitFor({ state: "visible" });
    await this.emailTextbox.fill(email);
    await this.passwordTextBox.fill(password);
    await this.signInButton.click();
  }

  async verifySuccessfulLogin() {
    await this.portfolioLink.waitFor({ state: "visible" });
    await expect(this.page.url()).toContain("/dashboard/main");
  }

  async validLogin() {
    await this.goto();
    await this.loginWithValidCredentials(
      process.env.VALID_EMAIL!,
      process.env.VALID_PASSWORD!
    );
  }

  async invalidLogin(email: string, password: string, URLError: string) {
    await this.goto();
    await this.enterUsernameAndPassword(email, password);
    await this.validateSignInError(URLError);
  }

  async validateSignInError(URLError: string) {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.url()).toContain(URLError);
  }
}
