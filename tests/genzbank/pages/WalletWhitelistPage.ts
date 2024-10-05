import { expect, type Locator, type Page } from "@playwright/test";
import { BasePage } from "./BasePage";
import { CommonUtils } from '../utils/common-utils'; // Import the utility class


export class WalletWhitelistPage extends BasePage {
  readonly walletWhitelistHeader: Locator;
  readonly addWhitelistButton: Locator;
  readonly addWhitelistDialog: Locator;
  readonly blockchainAddressHeading: Locator;
  readonly selectDropdown: Locator;
  readonly nickNameTextbox: Locator;
  readonly walletAddressTextArea: Locator;
  readonly transferLimitTextbox: Locator;
  readonly submitButton: Locator;
  readonly table: Locator;
  readonly rowsLocator: Locator;
  readonly nextPageButton: Locator;
  readonly deleteAlertDialog: Locator;
  readonly continueButton: Locator;
  readonly whitelistDeletedMessage: Locator;
  readonly blockchainNetworkLabel: Locator;
  readonly blockchainNetworkErrorText: Locator;
  readonly nickNameLabel: Locator;
  readonly nicknameErrorText: Locator;
  readonly walletAddressLabel: Locator;
  readonly walletAddressErrorText: Locator;
  readonly transferLimitLabel: Locator;
  readonly transferLimitErrorText: Locator;

  constructor(page: Page) {
    super(page);
    this.walletWhitelistHeader = page.locator("p a", {
      hasText: "Wallet Whitelist",
    });
    this.addWhitelistButton = page.locator('button:has-text("Add Whitelist")');
    this.addWhitelistDialog = page.locator('div[role = "dialog"]');
    this.blockchainAddressHeading = page.locator(
      'div h2:has-text("Whitelist Blockchain Address")'
    );
    this.selectDropdown = page.locator("select");
    this.nickNameTextbox = page.locator('input[name="nick_name"]');
    this.walletAddressTextArea = page.locator('textarea[name="address"]');
    this.transferLimitTextbox = page.locator('input[name="transfer_limit"]');
    this.submitButton = page.locator('button:has-text("Submit")');
    this.table = page.locator("table");
    this.rowsLocator = page.locator("tbody tr");
    this.nextPageButton = page.locator('button > svg > path[fill = "none"]');
    this.deleteAlertDialog = page.locator('div[role="alertdialog"]');
    this.continueButton = page.locator('button:has-text("Continue")');
    this.whitelistDeletedMessage = page.locator(
      'ol>li div:has-text("Whitelist deleted successfully!")'
    );
    this.blockchainNetworkLabel = page.locator(
      'label:has-text("Blockchain Network")'
    );
    this.blockchainNetworkErrorText = page.locator(
      "//select/following-sibling::p"
    );
    this.nickNameLabel = page.locator('label:has-text("Nickname")');
    this.nicknameErrorText = page.locator(
      "//input[@name='nick_name']/following-sibling::p"
    );
    this.walletAddressLabel = page.locator('label:has-text("Wallet Address")');
    this.walletAddressErrorText = page.locator(
      "//textarea[@name='address']/following-sibling::p"
    );
    this.transferLimitLabel = page.locator(
      'label:has-text("Transfer Limit (in AED)")'
    );
    this.transferLimitErrorText = page.locator(
      "//input[@name='transfer_limit']/following-sibling::p"
    );
  }

  async validateOnWalletWhitelistPage() {
    await this.walletWhitelistHeader.waitFor({ state: "visible" });
    await expect(await this.page.url()).toContain("/dashboard/whitelist");
  }

  async inputWhitelistValues(
    network: string,
    nickname: string,
    walletAddress: string,
    transferLimit: string
  ) {
    await this.addWhitelistButton.first().click();
    await this.addWhitelistDialog.waitFor({ state: "visible" });
    await expect(this.blockchainAddressHeading).toBeVisible();
    await this.selectDropdown.selectOption(network);
    await this.nickNameTextbox.fill(nickname);
    await this.walletAddressTextArea.fill(walletAddress);
    await this.transferLimitTextbox.fill(transferLimit);
    await this.submitButton.click();

    await this.page.waitForResponse(
      (response) =>
        response.url().includes("/dashboard/whitelist") &&
        response.status() === 200
    );
  }

  async addToWhitelist(
    network: string,
    nickname: string,
    walletAddress: string,
    transferLimit: string
  ) {
    await this.validateOnWalletWhitelistPage();
    const whitelistedCountBeforeAdding = await this.listWhitelist();
    console.log(`Row count1: ${whitelistedCountBeforeAdding}`);
    await this.inputWhitelistValues(
      network,
      nickname,
      walletAddress,
      transferLimit
    );
    await this.table.waitFor({ state: "visible" });

    const whitelistedCountAfterAdding = await this.listWhitelist();
    console.log(`Row count2: ${whitelistedCountAfterAdding}`);

    await expect(whitelistedCountAfterAdding).toBe(
      whitelistedCountBeforeAdding + 1
    );
  }

  async listWhitelist() {
    let totalRowCount = 0; // Variable to keep track of the total row count

    // Define the locators for rows and the next page button
    const rowsLocator = this.rowsLocator; // Adjust the locator to match your table rows
    const nextPageButton = this.nextPageButton;

    // Function to count rows on the current page
    const countRowsOnCurrentPage = async () => {
      await this.table.waitFor({ state: "visible" });

      const rowCount = await rowsLocator.count(); // Count the rows on the current page
      totalRowCount += rowCount; // Add the count to the total
      console.log(
        `Rows on this page: ${rowCount}, Total so far: ${totalRowCount}`
      );
    };

    // Start by counting the rows on the first page
    await countRowsOnCurrentPage();

    // Loop through pages while the "Next page" button is enabled
    while (await nextPageButton.nth(1).isEnabled()) {
      await nextPageButton.nth(1).click(); // Click the next page button

      //   await this.rowsLocator.waitFor({ state: "visible" });

      // Count rows on the new page
      await countRowsOnCurrentPage();
    }

    // Output the total row count after all pages have been processed
    console.log(`Total rows across all pages: ${totalRowCount}`);
    return totalRowCount;
  }

  async deleteFromWhitelist(
    inputNetwork: string,
    inputNickname: string,
    inputWalletAddress: string,
    inputTransferLimit: string
  ) {
    // Define locators for "Next Page" button and row locators
    const nextPageButton = await this.nextPageButton; // Adjust the locator for the next page button if needed
    let currentPage = 1; // Track the current page for debugging

    do {
      console.log(`Processing page ${currentPage}`);
      await this.page.waitForTimeout(10000);

      //   const rows = await this.page.locator("tbody tr");
      const rowCount = await this.rowsLocator.count();
      console.log(`rowCount in page ${currentPage} is ${rowCount}`);

      for (let i = 0; i < rowCount - 1; i++) {
        const row = this.rowsLocator.nth(i);
        let network = await row.locator("td:nth-child(1)").textContent();
        console.log(`network is ${network}`);
        console.log(`inputNetwork is ${inputNetwork}`);

        let nickname = await row.locator("td:nth-child(2)").textContent();
        console.log(`nickname is ${nickname}`);
        console.log(`inputNickname is ${inputNickname}`);

        let transferLimit = await row.locator("td:nth-child(3)").textContent();
        console.log(`transferLimit is ${transferLimit}`);
        console.log(`inputTransferLimit is ${inputTransferLimit}`);

        let walletAddress = await row.locator("td:nth-child(4)").textContent();
        console.log(`walletAddress is ${walletAddress}`);
        console.log(`inputWalletAddress is ${inputWalletAddress}`);

        if (
          network === inputNetwork &&
          nickname === inputNickname &&
          transferLimit === inputTransferLimit &&
          walletAddress === inputWalletAddress
        ) {
          console.log("input values match table value, hence deleting...");
          //   Click the delete button associated with this row
          await row.locator('button:has-text("Delete")').first().click();
          // Wait for confirmation dialog to appear
          await this.deleteAlertDialog.waitFor({ state: "visible" });

          // Confirm deletion by clicking the continue button
          await this.continueButton.click();

          // Wait for confirmation dialog to disappear
          await this.deleteAlertDialog.waitFor({ state: "hidden" });
          await this.whitelistDeletedMessage
            .first()
            .waitFor({ state: "visible" });

          await expect(this.whitelistDeletedMessage.first()).toBeVisible();
        }
      }

      // Check if the "Next Page" button is enabled
      if (await nextPageButton.nth(1).isEnabled()) {
        // Click to go to the next page
        await nextPageButton.nth(1).click();

        // Wait for the new page's content to load
        await this.page.waitForSelector("tr");

        currentPage++;
      } else {
        break; // If the "Next Page" button is disabled, stop the loop
      }
    } while (true);

    console.log("Deletion process completed.");
  }

  async validateWhitelisting(
    testDescription: string,
    network: string,
    nickname: string,
    walletAddress: string,
    transferLimit: string
  ) {
    await this.inputWhitelistValues(
      network,
      nickname,
      walletAddress,
      transferLimit
    );
    if(testDescription==='blank fields'){
        await CommonUtils.verifyElementColor(this.blockchainNetworkLabel,'rgb(255, 0, 0)');
        await CommonUtils.verifyElementColor(this.nickNameLabel,'rgb(255, 0, 0)');
        await CommonUtils.verifyElementColor(this.walletAddressLabel,'rgb(255, 0, 0)');
        await CommonUtils.verifyElementColor(this.transferLimitLabel,'rgb(255, 0, 0)');

        await CommonUtils.verifyText(this.blockchainNetworkErrorText, 'Please choose network id');
        await CommonUtils.verifyText(this.nicknameErrorText, 'Nickname is mandatory and must be at least 2 characters');
        await CommonUtils.verifyText(this.walletAddressErrorText, "Required");
        await CommonUtils.verifyText(this.transferLimitErrorText, "Expected number, received nan");
    }
  }
}
