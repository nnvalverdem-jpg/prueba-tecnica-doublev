export default class ProductPage {
  constructor(page) {
    this.page = page;
    this.searchBox = page.locator("input[name='search']");
    this.searchBtn = page.locator(".btn.btn-default.btn-lg");
  }

  async gotoLaptops() {
    await this.page.goto(
      "https://opencart.abstracta.us/index.php?route=product/category&path=18"
    );
  }

  async addToCart(productName) {
    await this.page.locator(`a:has-text("${productName}")`).click();
    await this.page.locator("#button-cart").click();
  }

  async search(productName) {
    await this.searchBox.fill(productName);
    await this.searchBtn.click();
  }
}
