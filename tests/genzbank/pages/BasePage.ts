import { Page, expect } from "@playwright/test";
import { Footer } from "./Footer";

export class BasePage {
  readonly page: Page;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.footer = new Footer(page);
  }

  async goto() {
    await this.page.goto("https://genzbank.vercel.app/");
    await expect(this.page).toHaveTitle(/Genz Bank/);
    await expect(this.page.url()).toContain(
      "/dashboard/signin/password_signin"
    );
  }

  async verifyFooterLinks() {
    this.footer.verifyFooterLinks();
  }
}
