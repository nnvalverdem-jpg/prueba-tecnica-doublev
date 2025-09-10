import { expect } from "@playwright/test";

export default class RegisterPage {
  constructor(page) {
    this.page = page;
    this.firstName = page.locator("#input-firstname");
    this.lastName = page.locator("#input-lastname");
    this.email = page.locator("#input-email");
    this.telephone = page.locator("#input-telephone");
    this.password = page.locator("#input-password");
    this.confirmPassword = page.locator("#input-confirm");
    this.privacyPolicy = page.locator("input[name='agree']");
    this.continueBtn = page.locator("input[value='Continue']");
  }

  async goto() {
    await this.page.goto(
      "https://opencart.abstracta.us/index.php?route=account/register"
    );
  }

  async register(user) {
    await this.page.fill("#input-firstname", user.firstName);
    await this.page.fill("#input-lastname", user.lastName);
    await this.page.fill("#input-email", user.email);
    await this.page.fill("#input-telephone", user.telephone);
    await this.page.fill("#input-password", user.password);
    await this.page.fill("#input-confirm", user.password);
    await this.page.check("input[name='agree']");
    await this.page.click("input[value='Continue']");
  }
  async successMessageVisible() {
    const content = await this.page.textContent("body");
    return content.includes("Congratulations");
  }
}
