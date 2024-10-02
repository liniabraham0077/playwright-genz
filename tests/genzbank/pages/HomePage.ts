import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly profileSettingsLink: Locator;
  readonly walletWhitelistLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.profileSettingsLink = page.locator('a[href="/dashboard/settings"]');
    this.walletWhitelistLink = page.locator('a[href="/dashboard/whitelist"]');
  }

}