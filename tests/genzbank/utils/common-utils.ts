import { expect, Locator } from "@playwright/test";

export class CommonUtils {
  /* method to get the element color of a specific text and verify if it matches the expected color */
  static async verifyElementColor(element: Locator, expectedColor: string) {
    // Get the computed color of the element using evaluate
    const actualColor = await element.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.color; // Get the computed color value (e.g., 'rgb(255, 0, 0)')
    });

    expect(actualColor).toBe(expectedColor);
  }

  /* method to get the text of a given locator and verify if it matches the expected text */
  static async verifyText(element: Locator, expectedText: string) {
    const actualText = await element.textContent();
    await expect(actualText).toBe(expectedText);
  }
}
