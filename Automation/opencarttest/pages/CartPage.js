import { expect } from "@playwright/test";

export default class CartPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(
      "https://opencart.abstracta.us/index.php?route=checkout/cart"
    );

    // Esperar tabla principal del carrito
    const cartTable = this.page.locator("#content table").first();
    await expect(cartTable).toBeVisible({ timeout: 15000 });
  }

  async updateQuantity(productName, quantity) {
    const row = this.page.locator(`//a[text()='${productName}']/ancestor::tr`);
    const qtyInput = row.locator("input[name*='quantity']");
    await qtyInput.fill(String(quantity));
    await row.locator("button[data-original-title='Update']").click();

    // Esperar que el valor se haya actualizado o la tabla cambie
    await expect(qtyInput).toHaveValue(String(quantity), { timeout: 15000 });
  }

  async removeProduct(productName) {
    const row = this.page.locator(`//a[text()='${productName}']/ancestor::tr`);
    await row.locator("button[data-original-title='Remove']").click();

    // Esperar que la fila desaparezca
    await expect(row).toHaveCount(0, { timeout: 15000 });
  }
}
