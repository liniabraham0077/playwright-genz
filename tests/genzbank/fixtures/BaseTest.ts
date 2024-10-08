import { TestInfo, test as baseTest } from "@playwright/test";
import { BasePage } from "../pages/BasePage";
import { RegistrationPage } from "../pages/RegistrationPage";
import { LoginPage } from "../pages/LoginPage";
import { ProfileSettingsPage } from "../pages/ProfileSettingsPage";
import { WalletWhitelistPage } from "../pages/WalletWhiteListPage";
import { HomePage } from "../pages/HomePage";

/* Test fixture to create object for each page in the application */
const test = baseTest.extend<{
  basePage: BasePage;
  registrationPage: RegistrationPage;
  loginPage: LoginPage;
  homePage: HomePage;
  profileSettingsPage: ProfileSettingsPage;
  walletWhitelistPage: WalletWhitelistPage;

  testInfo: TestInfo;
}>({
  basePage: async ({ page }, use) => {
    await use(new BasePage(page));
  },
  registrationPage: async ({ page }, use) => {
    await use(new RegistrationPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  profileSettingsPage: async ({ page }, use) => {
    await use(new ProfileSettingsPage(page));
  },
  walletWhitelistPage: async ({ page }, use) => {
    await use(new WalletWhitelistPage(page));
  },
});

export default test;
