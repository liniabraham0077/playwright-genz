import { expect } from "@playwright/test";
import test from "../fixtures/BaseTest";

/* Navigate to Genz bank url before each test*/
test.beforeEach(async ({ registrationPage }) => {
  await registrationPage.navigateToGenzBankURL();
});

/* Test to sign up with  valid email and password*/
test("Successful user registration", async ({ registrationPage }) => {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);
  await registrationPage.validRegistration(
    `test${randomNumber}@gmail.com`,
    "Password123#"
  );
  await registrationPage.verifyFooterLinks();
});

/* Parameterised test to sign up with different sets of invalid emailor password and verify the error in URL*/

[
  {
    testDescription: "blank email and password",
    email: "",
    password: "",
    URLError:
      "/dashboard/signin/signup?error=Sign%20up%20failed.&error_description=Anonymous%20sign-ins%20are%20disabled",
  },
  {
    testDescription: "blank password",
    email: "test@gmail.com",
    password: "",
    URLError:
      "/dashboard/signin/signup?error=Sign%20up%20failed.&error_description=Signup%20requires%20a%20valid%20password",
  },
  {
    testDescription: "invalid email format",
    email: "invalidemailformat",
    password: "invalidEmail",
    URLError:
      "/dashboard/signin/signup?error=Sign%20up%20failed.&error_description=Unable%20to%20validate%20email%20address%3A%20invalid%20format",
  },
  {
    testDescription: "already registered email",
    email: `${process.env.VALID_EMAIL}`,
    password: `${process.env.VALID_PASSWORD}`,
    URLError:
      "/dashboard/signin/signup?error=Sign%20up%20failed.&error_description=There%20is%20already%20an%20account%20associated%20with%20this%20email%20address.%20Try%20resetting%20your%20password.",
  },
].forEach(({ testDescription, email, password, URLError }) => {
  test(`Invalid registration scenario ${testDescription} with email ${email} password ${password} URLError ${URLError}`, async ({
    registrationPage,
  }) => {
    await registrationPage.invalidRegistration(email, password, URLError);
  });
});
