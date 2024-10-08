import { Page, expect } from "@playwright/test";
import { Footer } from "./Footer";

/* Base page contains features and functionalities common across multiple pages*/
export class BasePage {
  readonly page: Page;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.footer = new Footer(page);
  }

  /* method to navigate to Genz Bank URL*/
  async navigateToGenzBankURL() {
    await this.page.goto("https://genzbank.vercel.app/");
    await expect(this.page).toHaveTitle(/Genz Bank/);
    await expect(this.page.url()).toContain(
      "/dashboard/signin/password_signin"
    );
  }

  /* method to  verify footer links common across multiple pages*/
  async verifyFooterLinks() {
    this.footer.verifyFooterLinks();
  }
}
