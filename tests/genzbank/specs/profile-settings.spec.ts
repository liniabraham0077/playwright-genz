import { expect } from "@playwright/test";
import test from "../fixtures/BaseTest";

/* Test to update name in profile settings and verify whether the updated name is reflected correctly*/
test("User updates name in profile settings", async ({
  loginPage,
  homePage,
  profileSettingsPage,
}) => {
  await loginPage.validLogin();
  await homePage.navigateToProfileSettings();
  await profileSettingsPage.updateAndVerifyUpdatedName();
});
