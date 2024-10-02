import { Page } from "@playwright/test";
import { Footer } from "./Footer";

export class BasePage {
  readonly page: Page;
  readonly footer: Footer;

  constructor(page: Page) {
    this.page = page;
    this.footer = new Footer(page);
  }

  async verifyFooterLinks() {
    this.footer.verifyFooterLinks();
  }
}
