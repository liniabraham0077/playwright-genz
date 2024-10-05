import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";

// let registrationPage;

// test.beforeEach(async ({ page }) => {
//    registrationPage = new RegistrationPage(page);
//      await registrationPage.goto();
// });


test("Successful user registration", async ({ page }) => {
  const registrationPage = new RegistrationPage(page);
  await registrationPage.goto();
   const randomNumber = Math.floor(10000 + Math.random() * 90000);
  await registrationPage.validRegistration(
    `test${randomNumber}@gmail.com`,
    'Password123#'
  );
  await registrationPage.verifyFooterLinks();
});

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
    const registrationPage = new RegistrationPage(page);
    await registrationPage.goto();
    await registrationPage.invalidRegistration(email, password, URLError);
  });
});

