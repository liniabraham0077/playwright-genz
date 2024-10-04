import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProfileSettingsPage } from "../pages/ProfileSettingsPage";
import { WalletWhitelistPage } from "../pages/WalletWhiteListPage";

test("List whitelist", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const profileSettingsPage = new ProfileSettingsPage(page);
  const walletWhitelistPage = new WalletWhitelistPage(page);

  await loginPage.validLogin();
  await homePage.navigateToWalletWhitelist();
  await walletWhitelistPage.listWhitelist()
});

test("Add to whitelist", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const profileSettingsPage = new ProfileSettingsPage(page);
  const walletWhitelistPage = new WalletWhitelistPage(page);

  await loginPage.validLogin();
  await homePage.navigateToWalletWhitelist();
  await walletWhitelistPage.addToWhitelist("SOL","test","Ex4z4APyJoQGS4N5xiWiV1isj8mTo5UXzoeWJZzWPGQk","65");
});

test("Delete from whitelist", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const profileSettingsPage = new ProfileSettingsPage(page);
  const walletWhitelistPage = new WalletWhitelistPage(page);

  await loginPage.validLogin();
  await homePage.navigateToWalletWhitelist();
  await walletWhitelistPage.deleteFromWhitelist(
    "SOL",
    "test",
    "Ex4z4APyJoQGS4N5xiWiV1isj8mTo5UXzoeWJZzWPGQk",
    "65"
  );
});

