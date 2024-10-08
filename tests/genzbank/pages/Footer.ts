import { expect, type Locator, type Page } from "@playwright/test";

/* Footer component contains the locators and methids for footer links common across multiple pages in Genz bank application*/
export class Footer {
  readonly page: Page;
  readonly termsAndConditionsLink: Locator;
  readonly privacyPolicyLink: Locator;
  readonly licenseLink: Locator;
  readonly refundPolicyLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.termsAndConditionsLink = page.locator(
      'role=link[name="Terms & Conditions"]'
    );
    this.privacyPolicyLink = page.locator('role=link[name="Privacy Policy"]');
    this.licenseLink = page.locator('role=link[name="License"]');
    this.refundPolicyLink = page.locator('role=link[name="Refund Policy"]');
  }

  /* method to  verify footer links common across multiple pages*/
  async verifyFooterLinks() {
    await expect(this.termsAndConditionsLink).toBeVisible();
    await expect(this.privacyPolicyLink).toBeVisible();
    await expect(this.licenseLink).toBeVisible();
    await expect(this.refundPolicyLink).toBeVisible();
  }
}