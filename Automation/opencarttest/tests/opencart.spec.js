import { test } from "@playwright/test";
import RegisterPage from "../pages/RegisterPage.js";
import LoginPage from "../pages/LoginPage.js";
import ProductPage from "../pages/ProductPage.js";
import CartPage from "../pages/CartPage.js";
import CheckoutPage from "../pages/CheckoutPage.js";

test.describe("Flujos críticos OpenCart", () => {
  const user = {
    firstName: "Juan",
    lastName: "Pérez",
    email: `juan${Date.now()}@test.com`,
    telephone: "3001234567",
    password: "Test1234",
  };

  test("Completar flujo de compra", async ({ page }) => {
    // Registro
    const registerPage = new RegisterPage(page);
    await registerPage.goto();
    await registerPage.register(user);

    // Logout (para validar login aparte)
    await page.getByRole("link", { name: "Logout" }).first().click();

    // Login
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(user.email, user.password);

    // Seleccionar MacBook Pro
    const productPage = new ProductPage(page);
    await productPage.gotoLaptops();
    await productPage.addToCart("MacBook Pro");

    // Buscar tablet Samsung Galaxy
    await productPage.search("Samsung Galaxy Tab 10.1");
    await productPage.addToCart("Samsung Galaxy Tab 10.1");

    // Carrito
    const cartPage = new CartPage(page);
    await cartPage.goto();
    await cartPage.removeProduct("MacBook Pro");
    await cartPage.updateQuantity("Samsung Galaxy Tab 10.1", 2);

    // Checkout
    await page.locator("a.btn.btn-primary[href*='checkout/checkout']").click();
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.goto();
    await checkoutPage.completeOrder();
  });
});
