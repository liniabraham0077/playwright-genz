import { test, expect } from "@playwright/test";
import { SignInPage } from "../pages/RegistrationPage";

test("User registration", async ({ page }) => {

  const signinPage = new SignInPage(page);
  await signinPage.goto();
  await signinPage.registration();
  await signinPage.verifyFooterLinks();
});
