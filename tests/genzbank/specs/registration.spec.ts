import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";

test("User registration", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goto();
  await registrationPage.registration();
  await registrationPage.verifyFooterLinks();
});
