import { test, expect } from "@playwright/test";
import { SignInPage } from "../pages/sign-in";

test("User registration", async ({ page }) => {

  const signinPage = new SignInPage(page);
  await signinPage.goto();
  await signinPage.registration();
//   await page.goto("https://genzbank.vercel.app/");

//   console.log(await page.title());

// await expect(page).toHaveTitle(/Genz Bank/);
// await expect(page.url()).toContain("/dashboard/signin/password_signin");

//   await page.locator('role=link[name="Don\'t have an account? Sign up"]').click();
//   await page
//     .locator('role=button[name="Sign up"]')
//     .waitFor({ state: "visible" });


//   await expect(page.url()).toContain("/dashboard/signin/signup");
//     await expect(page.locator('role=link[name="Already have an account?"]')).toBeVisible();


//   const randomNumber = Math.floor(10000 + Math.random() * 90000);
//   await page
//     .locator('input[type="email"]')
//     .fill(`test${randomNumber}@gmail.com`);
// await page.locator('input[type="password"]').fill("Password123#");

// await page.locator('role=button[name="Sign up"]').click();
// await page.locator('role=button[name="Sign in"]').waitFor({state: 'visible'});
// await expect(page.url()).toContain("/dashboard/signin/password_signin");
});

// test("verify footer links", async ({ page }) => {
//   await page.goto("https://genzbank.vercel.app/");

//   console.log(await page.title());

//   await expect(page).toHaveTitl e(/Genz Bank/);
//   await expect(page.url()).toContain("/dashboard/signin/password_signin");

//       await expect(
//         page.locator('role=link[name="Terms & Conditions"]')
//       ).toBeVisible();

//       await expect(
//         page.locator('role=link[name="Privacy Policy"]')
//       ).toBeVisible();

//       await expect(page.locator('role=link[name="License"]')).toBeVisible();

//       await expect(
//         page.locator('role=link[name="Refund Policy"]')
//       ).toBeVisible();



//   await page
//     .locator('role=link[name="Don\'t have an account? Sign up"]')
//     .click();

//       await page
//         .locator('role=button[name="Sign up"]')
//         .waitFor({ state: "visible" });

//   await expect(page.url()).toContain("/dashboard/signin/signup");

//    await expect(
//      page.locator('role=link[name="Terms & Conditions"]')
//    ).toBeVisible();

//    await expect(page.locator('role=link[name="Privacy Policy"]')).toBeVisible();

//    await expect(page.locator('role=link[name="License"]')).toBeVisible();

//    await expect(page.locator('role=link[name="Refund Policy"]')).toBeVisible();
// });
