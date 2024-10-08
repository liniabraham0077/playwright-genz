import { expect } from "@playwright/test";
import test from "../fixtures/BaseTest";

/* Navigate to wallet whitelist page before each test*/
test.beforeEach(async ({ loginPage, homePage }) => {
  await loginPage.validLogin();
  await homePage.navigateToWalletWhitelist();
});

/* Test to list all whitelisted wallets */
test("List whitelist", async ({ walletWhitelistPage }) => {
  await walletWhitelistPage.listWhitelistedAddresses();
});

/* Test to add a single wallet address to whitelist */
test("Add to whitelist", async ({ walletWhitelistPage }) => {
  await walletWhitelistPage.addToWhitelist(
    "SOL",
    "test",
    "Ex4z4APyJoQGS4N5xiWiV1isj8mTo5UXzoeWJZzWPGQk",
    "65"
  );
});

/* Test to delete a single wallet address from the whitelist */
test("Delete from whitelist", async ({ walletWhitelistPage }) => {
  await walletWhitelistPage.deleteFromWhitelist(
    "SOL",
    "test",
    "Ex4z4APyJoQGS4N5xiWiV1isj8mTo5UXzoeWJZzWPGQk",
    "65"
  );
});

/* Test to add multiple wallet addresses to whitelist */
[
  {
    network: "SOL",
    nickname: "test1",
    transferLimit: "5000",
    walletAddress: "Dwn8BQXXwTkypZhXtq95ReiKtqFEw87wmMWZkxmdUJJ6",
  },
  {
    network: "ETH",
    nickname: "test2",
    transferLimit: "6000",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  },
  {
    network: "BTC",
    nickname: "test3",
    transferLimit: "7000",
    walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
].forEach(({ network, nickname, transferLimit, walletAddress }) => {
  test(`Add to whitelist with network ${network}, nickname ${nickname}, transferLimit ${transferLimit} walletAddress ${walletAddress}`, async ({
    walletWhitelistPage,
  }) => {
    await walletWhitelistPage.addToWhitelist(
      network,
      nickname,
      walletAddress,
      transferLimit
    );
  });
});

/* Test to delete multiple wallet addresses from the whitelist */
[
  {
    network: "SOL",
    nickname: "test1",
    transferLimit: "5000",
    walletAddress: "Dwn8BQXXwTkypZhXtq95ReiKtqFEw87wmMWZkxmdUJJ6",
  },
  {
    network: "ETH",
    nickname: "test2",
    transferLimit: "6000",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
  },
  {
    network: "BTC",
    nickname: "test3",
    transferLimit: "7000",
    walletAddress: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
  },
].forEach(({ network, nickname, transferLimit, walletAddress }) => {
  test(`Delete from whitelist with network ${network}, nickname ${nickname}, transferLimit ${transferLimit} walletAddress ${walletAddress}`, async ({
    walletWhitelistPage,
  }) => {
    await walletWhitelistPage.addToWhitelist(
      network,
      nickname,
      walletAddress,
      transferLimit
    );
  });
});

[
  {
    testDescription: "blank fields",
    network: "",
    nickname: "",
    transferLimit: "",
    walletAddress: "",
  },
  {
    testDescription: "Nickname less than 2 chars",
    network: "ETH",
    nickname: "x",
    transferLimit: "1000",
    walletAddress: "0x267be1C1D684F78cb4F6a176C4911b741e4Ffdc0",
  },
  {
    testDescription: "Invalid wallet address",
    network: "SOL",
    nickname: "invalid wallet address",
    transferLimit: "1000",
    walletAddress: "0x267be1C1D684F78cb4F6a176C4911b741e4Ffdc0",
  },
].forEach(
  ({ testDescription, network, nickname, transferLimit, walletAddress }) => {
    test(` @executeTest Whitelist submission invalid scenario ${testDescription} with network ${network}, nickname ${nickname}, transferLimit ${transferLimit} walletAddress ${walletAddress}`, async ({
      walletWhitelistPage,
    }) => {
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
