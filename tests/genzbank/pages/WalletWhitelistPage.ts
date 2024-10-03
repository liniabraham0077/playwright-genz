import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class WalletWhitelistPage extends BasePage {
  readonly walletWhitelistHeader: Locator;
  readonly addWhitelistButton: Locator;
  readonly profileSettingsText: Locator;
  readonly updateNameButton: Locator;
  readonly nameText: Locator;

  constructor(page: Page) {
    super(page);
    this.walletWhitelistHeader = page.locator("p a", {
      hasText: "Wallet Whitelist"
    });
    this.addWhitelistButton = page.locator('button:has-text("Add Whitelist")');
  }

  async validateOnWalletWhitelistPage() {
    await this.walletWhitelistHeader.waitFor({ state: "visible" });
    await expect(this.page.url()).toContain("/dashboard/whitelist");
  }

  async addWhitelist() {
    await this.validateOnWalletWhitelistPage();
    await this.addWhitelistButton.first().click();
    await this.page.locator('div[role = "dialog"]').waitFor({ state: "visible" });
    await expect(
      this.page.locator('div h2:has-text("Whitelist Blockchain Address")')
    ).toBeVisible();
    await this.page.locator("select").selectOption("SOL");
    await this.page.locator('input[name="nick_name"]').fill('test')
    await this.page
      .locator('textarea[name="address"]')
      .fill("Ex4z4APyJoQGS4N5xiWiV1isj8mTo5UXzoeWJZzWPGQk");
    await this.page.locator('input[name="transfer_limit"]').fill("5000");
    await this.page.locator('button:has-text("Submit")').click();
        await this.page.waitForTimeout(10000);







  }
}
