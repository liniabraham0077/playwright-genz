import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

/*Login page contains the locators and methods for the user to login to the Genz bank application*/
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

  /* method to login to the Genz bank application successfully*/
  async loginWithValidCredentials(email: string, password: string) {
    await this.enterUsernameAndPassword(email, password);
    await this.verifySuccessfulLogin();
  }

  /* method to enter username and password and submit the login form*/
  async enterUsernameAndPassword(email: string, password: string) {
    await this.emailTextbox.waitFor({ state: "visible" });
    await this.emailTextbox.fill(email);
    await this.passwordTextBox.fill(password);
    await this.signInButton.click();
  }

  /* method to verify if the user has logged in successfully by validating the URL*/
  async verifySuccessfulLogin() {
    await this.portfolioLink.waitFor({ state: "visible" });
    await expect(this.page.url()).toContain("/dashboard/main");
  }

  /* method to perform valid login for a user*/
  async validLogin() {
    await this.navigateToGenzBankURL();
    await this.loginWithValidCredentials(
      process.env.VALID_EMAIL!,
      process.env.VALID_PASSWORD!
    );
  }

  /* method to perform invalid sign in for a user and verify the error in the url*/
  async invalidLogin(email: string, password: string, URLError: string) {
    await this.navigateToGenzBankURL();
    await this.enterUsernameAndPassword(email, password);
    await this.validateSignInError(URLError);
  }

  /* method to sign in with invalid emailor password and validate error in URL upon sign up*/
  async validateSignInError(URLError: string) {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.url()).toContain(URLError);
  }
}
