import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProfileSettingsPage } from "../pages/ProfileSettingsPage";
import { WalletWhitelistPage } from "../pages/WalletWhiteListPage";

// test("Add to whitelist", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const homePage = new HomePage(page);
//   const profileSettingsPage = new ProfileSettingsPage(page);
//   const walletWhitelistPage = new WalletWhitelistPage(page);

//   await loginPage.validLogin();
//   await homePage.navigateToWalletWhitelist();
//   await walletWhitelistPage.addWhitelist();
// });

test("Delete from whitelist", async ({ page }) => {
    test.slow();
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const profileSettingsPage = new ProfileSettingsPage(page);
  const walletWhitelistPage = new WalletWhitelistPage(page);

  await loginPage.validLogin();
  await homePage.navigateToWalletWhitelist();
  await walletWhitelistPage.deleteWhitelist();
});

