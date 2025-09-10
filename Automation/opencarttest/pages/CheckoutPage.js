import { expect } from "@playwright/test";

export default class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async goto() {
    await expect(this.page.locator("h1:has-text('Checkout')")).toBeVisible({
      timeout: 10000,
    });
  }

  async completeOrder() {
    // Paso 2: Payment/Account details
    const paymentPanelContinue = this.page
      .locator("#collapse-payment-address button")
      .getByText("Continue");
    await paymentPanelContinue.click();

    // Paso 3: Shipping Method
    // Esperar que el panel Shipping Method esté expandido
    const shippingPanel = this.page.locator("#collapse-shipping-method");
    await shippingPanel.waitFor({ state: "visible", timeout: 15000 });

    // Seleccionar el primer método de envío
    const shippingMethodRadio = shippingPanel
      .locator("input[name='shipping_method']")
      .first();
    await shippingMethodRadio.check();

    // Continuar con el botón Continue del panel
    const shippingMethodContinue = shippingPanel
      .locator("button")
      .getByText("Continue");
    await shippingMethodContinue.click();

    // Paso 4: Payment Method
    const paymentPanel = this.page.locator("#collapse-payment-method");
    await paymentPanel.waitFor({ state: "visible", timeout: 15000 });

    // Aceptar términos
    const agreeCheckbox = paymentPanel.locator('input[name="agree"]');
    await agreeCheckbox.check();

    // Continuar con el botón Continue
    const paymentContinue = paymentPanel
      .locator("button")
      .getByText("Continue");
    await paymentContinue.click();

    // Paso 5: Confirm Order
    const confirmPanel = this.page.locator("#collapse-checkout-confirm");
    await confirmPanel.waitFor({ state: "visible", timeout: 15000 });

    const confirmBtn = confirmPanel
      .locator("button")
      .getByText("Confirm Order");
    await confirmBtn.click();

    // Validar mensaje final
    const successMsg = this.page.locator("div.alert-success");
    await expect(successMsg).toBeVisible({ timeout: 20000 });
  }
}
