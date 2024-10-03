import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class HomePage extends BasePage{
  readonly profileSettingsLink: Locator;
  readonly walletWhitelistLink: Locator;

  constructor(page: Page) {
    super(page); 
    this.profileSettingsLink = page.locator('a[href="/dashboard/settings"]');
    this.walletWhitelistLink = page.locator('a[href="/dashboard/whitelist"]');
  }

  async navigateToProfileSettings() {
    await this.profileSettingsLink.first().click();
  }

  async navigateToWalletWhitelist() {
    await this.walletWhitelistLink.first().click();
  }
}