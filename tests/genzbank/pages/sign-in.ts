import { expect, type Locator, type Page } from "@playwright/test";

export class SignInPage {
  readonly page: Page;
  readonly signUpLink: Locator;
  readonly signUpButton: Locator;
  readonly alreadyHaveAnAccountLink: Locator;
  readonly emailTextbox: Locator;
  readonly passwordTextBox: Locator;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signUpLink = page.locator(
      'role=link[name="Don\'t have an account? Sign up"]'
    );
    this.signUpButton = page.locator('role = button[name = "Sign up"]');

    // this.signUpButton = page.locator("h1", { hasText: "Installation" });
    this.alreadyHaveAnAccountLink = page.locator(
      'role=link[name="Already have an account?"]');
    this.emailTextbox = page.locator('input[type="email"]');
    this.passwordTextBox = page.locator('input[type="password"]');
    this.signInButton = page.locator('role = button[name = "Sign in"]');
  }

  async goto() {
    await this.page.goto("https://genzbank.vercel.app/");
    await expect(this.page).toHaveTitle(/Genz Bank/);
    await expect(this.page.url()).toContain("/dashboard/signin/password_signin");
  }

  async registration() {
   await this.signUpLink.click();
   await this.signUpButton.waitFor({ state: "visible" });

   await expect(this.page.url()).toContain("/dashboard/signin/signup");
   await expect(this.alreadyHaveAnAccountLink).toBeVisible();
   await this.enterUsernameAndPassword();
   
  }

  async enterUsernameAndPassword() {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    await this.emailTextbox.fill(`test${randomNumber}@gmail.com`);
    await this.passwordTextBox.fill("Password123#");

    await this.signUpButton.click();
    await this.signInButton.waitFor({ state: "visible" });
    await expect(this.page.url()).toContain(
      "/dashboard/signin/password_signin"
    );

  }

}
