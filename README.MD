Install node

1. Clone the Git Repository

git clone <repo url>

2. Install Dependencies

Run `npm install` to install the packages in package.json file

3. Install Playwright Browsers

This will install the browsers (Chromium, Firefox, WebKit) for running the tests.

Run `npx playwright install`

4. in .env file add the values for the following

VALID_EMAIL= <add a valid email for login>
VALID_PASSWORD=<add a valid password for login>
TAGS= <add the tag for the spec file you want to run for example @executeTest , add @executeTest in the spec title as well>. Leave it blank to run all tests

5. Run Tests

1. Run tests on Chrome browser in headed mode
`npm run chrome:headed`
2. Run tests on Chrome browser in headless mode
`npm run chrome:headless`
3. Run tests on Firefox browser in headed mode
`npm run firefox:headed`
4. Run tests on Firefox browser in headless mode
`npm run firefox:headless`
5. Run tests on Safari browser in headed mode
`npm run safari:headed`
6. Run tests on Safari browser in headless mode
`npm run safari:headless`
7. Run tests on all browsers in headed mode
`npm run all:browsers:headed`
8. Run tests on all browsers in headless mode
`npm run all:browsers:headless`

Test report can be found under playwright-report/index.html.Open with a browser to view the test results.

Folder structure

tests/genzbank/fixtures - BaseTest class to iniitialuse all pages
tests/genzbank/pages - Page object classes with locators and methods for each page
tests/genzbank/specs - Tests for each feature
tests/genzbank/utils - utility classes with helper methods to be used in page object classes




 