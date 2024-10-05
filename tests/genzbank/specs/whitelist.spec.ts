import { test, expect } from "@playwright/test";
import { RegistrationPage } from "../pages/RegistrationPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProfileSettingsPage } from "../pages/ProfileSettingsPage";
import { WalletWhitelistPage } from "../pages/WalletWhiteListPage";

test.beforeEach(async ({ page }) => {
   const loginPage = new LoginPage(page);
   const homePage = new HomePage(page);
   const profileSettingsPage = new ProfileSettingsPage(page);

    await loginPage.validLogin();
    await homePage.navigateToWalletWhitelist();
});


// test("List whitelist", async ({ page }) => {
//   const walletWhitelistPage = new WalletWhitelistPage(page);
// });

// test("Add to whitelist", async ({ page }) => {
//   const walletWhitelistPage = new WalletWhitelistPage(page);
//   await walletWhitelistPage.addToWhitelist("SOL","test","Ex4z4APyJoQGS4N5xiWiV1isj8mTo5UXzoeWJZzWPGQk","65");
// });

// test("Delete from whitelist", async ({ page }) => {
//   const walletWhitelistPage = new WalletWhitelistPage(page);
//   await walletWhitelistPage.deleteFromWhitelist(
//     "SOL",
//     "test",
//     "Ex4z4APyJoQGS4N5xiWiV1isj8mTo5UXzoeWJZzWPGQk",
//     "65"
//   );
// });


// [
//   {network: "SOL",nickname: "test1",transferLimit: "5000",walletAddress: "Dwn8BQXXwTkypZhXtq95ReiKtqFEw87wmMWZkxmdUJJ6"},
//   {network: "ETH",nickname: "test2",transferLimit: "6000",walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"},
//   {network: "BTC",nickname: "test3",transferLimit: "7000", walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"},
// ].forEach(({ network, nickname, transferLimit, walletAddress }) => {
//   test(`Add to whitelist with network ${network}, nickname ${nickname}, transferLimit ${transferLimit} walletAddress ${walletAddress}`, async ({
//     page,
//   }) => {
//     const walletWhitelistPage = new WalletWhitelistPage(page);

//     await walletWhitelistPage.addToWhitelist(
//       network, nickname, walletAddress, transferLimit
//     );
//   });
// });


// [
//   {network: "SOL",nickname: "test1",transferLimit: "5000", walletAddress: "Dwn8BQXXwTkypZhXtq95ReiKtqFEw87wmMWZkxmdUJJ6"},
//   {network: "ETH",nickname: "test2",transferLimit: "6000",walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"},
//   {network: "BTC",nickname: "test3",transferLimit: "7000",walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"},
// ].forEach(({ network, nickname, transferLimit, walletAddress }) => {
//   test(`Delete from whitelist with network ${network}, nickname ${nickname}, transferLimit ${transferLimit} walletAddress ${walletAddress}`, async ({
//     page,
//   }) => {
//     const walletWhitelistPage = new WalletWhitelistPage(page);
//     await walletWhitelistPage.addToWhitelist(
//       network,
//       nickname,
//       walletAddress,
//       transferLimit
//     );
//   });
// });



[
  //   {
  //     testDescription: "blank fields",
  //     network: "",
  //     nickname: "",
  //     transferLimit: "",
  //     walletAddress: "",
  //   },
//   {
//     testDescription: "Nickname less than 2 chars",
//     network: "ETH",
//     nickname: "x",
//     transferLimit: "1000",
//     walletAddress: "0x267be1C1D684F78cb4F6a176C4911b741e4Ffdc0",
//   },
  {
    testDescription: "Invalid wallet address",
    network: "SOL",
    nickname: "invalid wallet address",
    transferLimit: "1000",
    walletAddress: "0x267be1C1D684F78cb4F6a176C4911b741e4Ffdc0",
  },
  //   {network: "ETH",nickname: "test2",transferLimit: "6000",walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e"},
  //   {network: "BTC",nickname: "test3",transferLimit: "7000", walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"},
].forEach(
  ({ testDescription, network, nickname, transferLimit, walletAddress }) => {
    test(` @executeTest Whitelist submission invalid scenario ${testDescription} with network ${network}, nickname ${nickname}, transferLimit ${transferLimit} walletAddress ${walletAddress}`, async ({
      page,
    }) => {
      const walletWhitelistPage = new WalletWhitelistPage(page);

      await walletWhitelistPage.validateWhitelisting(
        testDescription,
        network,
        nickname,
        walletAddress,
        transferLimit
      );
    });
  }
);


