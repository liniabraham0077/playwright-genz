import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

/* User is navigated to home page upon successful login. Home page contains methods to navigate to respective pages*/
export class HomePage extends BasePage {
  readonly profileSettingsLink: Locator;
  readonly walletWhitelistLink: Locator;

  constructor(page: Page) {
    super(page);
    this.profileSettingsLink = page.locator('a[href="/dashboard/settings"]');
    this.walletWhitelistLink = page.locator('a[href="/dashboard/whitelist"]');
  }

  /* method to navigate to profile settings of the user*/
  async navigateToProfileSettings() {
    await this.profileSettingsLink.first().click();
  }

  /* method to navigate to wallet whitelist page*/
  async navigateToWalletWhitelist() {
    await this.walletWhitelistLink.first().click();
  }
}