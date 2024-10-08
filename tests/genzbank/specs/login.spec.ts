import { expect } from "@playwright/test";
import test from "../fixtures/BaseTest";

/* Navigate to Genz bank url before each test*/
test.beforeEach(async ({ loginPage }) => {
  await loginPage.navigateToGenzBankURL();
});

/* Test to login with valid email andpassword */
test("Login with valid credential", async ({ loginPage }) => {
  await loginPage.navigateToGenzBankURL();
  await loginPage.loginWithValidCredentials(
    process.env.VALID_EMAIL!,
    process.env.VALID_PASSWORD!
  );
});

/* Parameterised test to login with different sets of invalid credentials and verify the error in URL*/

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
].forEach(({ testDescription, email, password, URLError }) => {
  test(`Invalid registration scenario ${testDescription} with email ${email} password ${password} URLError ${URLError}`, async ({
    loginPage,
  }) => {
    await loginPage.invalidLogin(email, password, URLError);
  });
});
