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

  async loginWithValidCredentials() {
    await this.enterUsernameAndPassword();
  }

  async enterUsernameAndPassword() {
    await this.emailTextbox.fill("liniabraham007@gmail.com");
    await this.passwordTextBox.fill("Test123#");
    await this.signInButton.click();
    await this.portfolioLink.waitFor({ state: "visible" });
    await expect(this.page.url()).toContain("/dashboard/main");
  }

  async validLogin(){
    await this.goto();
    await this.loginWithValidCredentials();
  }
}
