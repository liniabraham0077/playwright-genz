import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProfileSettingsPage } from "../pages/ProfileSettingsPage";

test("User updates name in profile settings", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const profileSettingsPage = new ProfileSettingsPage(page);
  await loginPage.validLogin();
  await homePage.navigateToProfileSettings();
  await profileSettingsPage.updateName();
});
