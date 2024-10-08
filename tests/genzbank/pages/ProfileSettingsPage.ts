import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";

/*Profile settings page contains the locators and methods for the user to update the profile settings*/
export class ProfileSettingsPage extends BasePage {
  readonly enterNameTextBox: Locator;
  readonly accountDetailsText: Locator;
  readonly profileSettingsText: Locator;
  readonly updateNameButton: Locator;
  readonly nameText: Locator;

  constructor(page: Page) {
    super(page);
    this.enterNameTextBox = page.locator('input[name="fullName"]');
    this.accountDetailsText = page.locator('p:has-text("Account Details")');
    this.profileSettingsText = page.locator('a:has-text("Profile Settings")');
    this.updateNameButton = page.locator('role = button[name = "Update name"]');
    this.nameText = page.locator(
      '//p[contains(text(),"CEO and Founder")]/preceding-sibling::p'
    );
  }

  /* method to validate if the user is on the profile settings page */
  async validateProfileSettingsPage() {
    await this.accountDetailsText.waitFor({ state: "visible" });
    await expect(this.page.url()).toContain("/dashboard/settings");
  }

  /* method to update the user's name on the profile settings page  and validate if the name update is reflected correctly*/
  async updateAndVerifyUpdatedName() {
    const updateNameInput = `la${Math.floor(10000 + Math.random() * 90000)}`;
    console.log(updateNameInput);

    await this.enterNameTextBox.fill(updateNameInput);
    await this.updateNameButton.click();
    await this.page.waitForResponse(
      (response) =>
        response.url().includes(`/settings?fullName=${updateNameInput}`) &&
        response.status() === 200
    );
    await this.page
      .locator(`p:has-text('${updateNameInput}')`)
      .first()
      .waitFor({ state: "visible" });
    const updatedName = await this.nameText.textContent();
    await expect(updateNameInput).toBe(updatedName);
  }
}