import { expect, Locator } from "@playwright/test";

export class CommonUtils {
  /**
   * Get the color of an element.
   * @param {Locator} element - The Playwright locator of the element.
   * @returns {Promise<string>} The computed color value in RGB format.
   */
  static async verifyElementColor(element: Locator, expectedColor: string) {
    // Get the computed color of the element using evaluate
    const actualColor = await element.evaluate((el) => {
      const style = window.getComputedStyle(el);
      return style.color; // Get the computed color value (e.g., 'rgb(255, 0, 0)')
    });

    // Perform the assertion in the Node.js context
    expect(actualColor).toBe(expectedColor);
  }

  static async verifyText(element: Locator, expectedText: string) {
    const actualText = await element.textContent();
    await expect(actualText).toBe(expectedText);
  }
}
