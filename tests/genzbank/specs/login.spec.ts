import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("Login with valid credential", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithValidCredentials();
});
