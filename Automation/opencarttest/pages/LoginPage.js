import { expect } from "@playwright/test";

export default class LoginPage {
  constructor(page) {
    this.page = page;
    this.email = page.locator("#input-email");
    this.password = page.locator("#input-password");
    this.loginBtn = page.locator("input[value='Login']");
  }

  async goto() {
    await this.page.goto(
      "https://opencart.abstracta.us/index.php?route=account/login"
    );
  }

  async login(email, password) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.loginBtn.click();
    await expect(
      this.page.locator("#content").getByRole("heading", { name: "My Account" })
    ).toBeVisible();
  }
}
