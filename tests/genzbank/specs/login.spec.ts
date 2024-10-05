import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

test("Login with valid credential", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.loginWithValidCredentials(process.env.VALID_EMAIL!, process.env.VALID_PASSWORD!);
});

[
  {
    testDescription: "blank email and password",
    email: "",
    password: "",
    URLError:
      "/dashboard/signin/password_signin?error=Sign%20in%20failed.&error_description=missing%20email%20or%20phone",
  },
  {
    testDescription: "blank password",
    email: "test@gmail.com",
    password: "",
    URLError:
      "/dashboard/signin/password_signin?error=Sign%20in%20failed.&error_description=Invalid%20login%20credentials",
  },
  {
    testDescription: "invalid email format",
    email: "invalidemailformat",
    password: "invalidEmail",
    URLError:
      "/dashboard/signin/password_signin?error=Sign%20in%20failed.&error_description=Invalid%20login%20credentials",
  },
  {
    testDescription: "invalid email format",
    email: "invalidemailformat",
    password: "password",
    URLError:
      "/dashboard/signin/password_signin?error=Sign%20in%20failed.&error_description=Invalid%20login%20credentials",
  },
  {
    testDescription: "valid email invalid password",
    email: `${process.env.VALID_EMAIL}`,
    password: "invalidPassword",
    URLError:
      "/dashboard/signin/password_signin?error=Sign%20in%20failed.&error_description=Invalid%20login%20credentials",
  },
  // {
  //   testDescription: "already registered email",
  //   email: "invalidemailformat",
  //   password: "blankemail",
  //   URLError:
  //     "/dashboard/signin/signup?error=Sign%20up%20failed.&error_description=Unable%20to%20validate%20email%20address%3A%20invalid%20format",
  // },
].forEach(({ testDescription, email, password, URLError }) => {
  test(`Invalid registration scenario ${testDescription} with email ${email} password ${password} URLError ${URLError}`, async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.invalidLogin(email, password, URLError);
  });
});