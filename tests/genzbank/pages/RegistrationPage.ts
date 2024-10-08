import { expect, type Locator, type Page } from "@playwright/test";
import { Footer } from "./Footer";
import { BasePage } from "./BasePage";

/* Registration page contains the locators and methods for the user registration */
export class RegistrationPage extends BasePage {
  readonly signUpLink: Locator;
  readonly signUpButton: Locator;
  readonly alreadyHaveAnAccountLink: Locator;
  readonly emailTextbox: Locator;
  readonly passwordTextBox: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    super(page);
    this.signUpLink = page.locator(
      'role=link[name="Don\'t have an account? Sign up"]'
    );
    this.signUpButton = page.locator('role = button[name = "Sign up"]');

    this.alreadyHaveAnAccountLink = page.locator(
      'role=link[name="Already have an account?"]'
    );
    this.emailTextbox = page.locator('input[type="email"]');
    this.passwordTextBox = page.locator('input[type="password"]');
    this.signInButton = page.locator('role = button[name = "Sign in"]');
  }

  /* method to perform successful user registration*/
  async validRegistration(email: string, password: string) {
    await this.signUpLink.click();
    await this.signUpButton.waitFor({ state: "visible" });

    await expect(this.page.url()).toContain("/dashboard/signin/signup");
    await expect(this.alreadyHaveAnAccountLink).toBeVisible();
    await this.enterUsernameAndPassword(email, password);
    await this.validateSuccessfulRegistration();
  }

  /* method to perform invalid user registration and verify error message*/
  async invalidRegistration(email: string, password: string, URLError: string) {
    await this.signUpLink.click();
    await this.signUpButton.waitFor({ state: "visible" });

    await expect(this.page.url()).toContain("/dashboard/signin/signup");
    await expect(this.alreadyHaveAnAccountLink).toBeVisible();
    await this.enterUsernameAndPassword(email, password);
    await this.validateSignUpError(URLError);
  }

  /* method to enter user credentials and sign up */
  async enterUsernameAndPassword(email: string, password: string) {
    await this.emailTextbox.fill(email);
    await this.passwordTextBox.fill(password);

    await this.signUpButton.click();
  }

  /* method to verify successful user registration URL*/
  async validateSuccessfulRegistration() {
    await this.signInButton.waitFor({ state: "visible" });
    await expect(this.page.url()).toContain(
      "/dashboard/signin/password_signin"
    );
  }

  /* method to verify user sign up errors in the URL*/
  async validateSignUpError(URLError: string) {
    await this.page.waitForLoadState("networkidle");
    await expect(this.page.url()).toContain(URLError);
  }
}
