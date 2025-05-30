/// <reference types="cypress" />

describe("Product Page", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");

    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
  });

  it("Verify that the header and header elements are displayed", () => {
    cy.get(".header_container").should("be.visible");
    cy.get(".app_logo").should("be.visible").and("contain", "Swag Labs");
    cy.get("#react-burger-menu-btn").should("be.visible");
    cy.get(".shopping_cart_link").should("be.visible");
    cy.get(".shopping_cart_badge").should("not.exist");
    cy.get(".title").should("be.visible").and("contain", "Products");
    cy.get(".product_sort_container").should("be.visible");
  });

  it("Verify the hamburger menu should be clickable", () => {
    cy.get("#react-burger-menu-btn").click();
    cy.get(".bm-menu").should("be.visible");
    cy.get(".bm-item-list")
      .should("be.visible")
      .within(() => {
        cy.contains("All Items").should("be.visible");
        cy.contains("About").should("be.visible");
        cy.contains("Logout").should("be.visible");
        cy.contains("Reset App State").should("be.visible");
      });
    cy.get("#react-burger-cross-btn").should("be.visible").click();
    cy.get(".bm-menu").should("not.be.visible");
  });

  it.only("Verify the about option is clickable", () => {
    cy.get("#react-burger-menu-btn").click();
    //verify menu is visible and About option exists
    cy.get(".bm-item-list")
      .should("be.visible")
      .within(() => {
        cy.get("#about_sidebar_link")
          .should("be.visible")
          .and("have.attr", "href")
          .and("include", "saucelabs.com");
      });
    // //click About Option
    // cy.get("#about_sidebar_link").click();
    // // cy.url().should("include", "https://saucelabs.com/");
  });

  it("Verify the cart icon is clickable and navigated to the cart page", () => {
    cy.get(".shopping_cart_link").click();
    cy.url()
      .should("include", "/cart.html")
      .and("eq", "https://www.saucedemo.com/cart.html");
    cy.get(".cart_list").should("be.visible");
    cy.get("#checkout").should("be.visible");
    cy.get("#continue-shopping").should("be.visible");
  });

  it("Verify the filter drop-dpwn is clickable", () => {
    cy.get(".product_sort_container").should("be.visible").select("za");
    cy.get(".product_sort_container").should("have.value", "za");
  });

  it("Verify the inventory container with inventory list and items", () => {
    cy.get("#inventory_container").should("exist").and("be.visible");
    cy.get(".inventory_list").should("exist").and("be.visible");
    cy.get(".inventory_item").should("have.length.greaterThan", 0);
  });

  it("Verify the inventory container with inventory items", () => {
    cy.get("#inventory_container").should("exist").and("be.visible");
    cy.get(".inventory_list").should("exist").and("be.visible");
    cy.get(".inventory_item").eq(2).should("exist").and("be.visible");
  });

  it("Verify product card elements", () => {
    cy.get(".inventory_item")
      .eq(0)
      .within(() => {
        cy.get(".inventory_item_img img").should("be.visible");
        cy.get(".inventory_item_name").should("be.visible").and("not.be.empty");
        cy.get(".inventory_item_desc").should("be.visible").and("not.be.empty");
        cy.get(".inventory_item_price").should("be.visible");
        cy.get(".btn_inventory")
          .should("be.visible")
          .and("have.text", "Add to cart");
      });
  });

  it("Verify clicking on the product name navigates to product details page", () => {
    cy.get(".inventory_item_name").eq(0).click();
    cy.url().should("include", "/inventory-item.html");
    cy.go("back");
  });

  it("Verify clicking on the product image navigates to product details page", () => {
    cy.get(".inventory_item_img").eq(0).click();
    cy.url().should("include", "/inventory-item.html");
    cy.go("back");
  });

  it("Verify clicking on the cart icon navigates to the cart page", () => {
    cy.get(".shopping_cart_link").click();
    cy.url().should("include", "/cart.html");
    cy.go("back");
  });

  it("verify footer and elements", () => {
    cy.get(".footer")
      .should("exist")
      .and("be.visible")
      .within(() => {
        cy.get(".footer_copy").should("be.visible");
        cy.get(".footer_copy")
          .invoke("text")
          .should("include", "Sauce Labs. All Rights Reserved.");
        cy.get(".social")
          .should("be.visible")
          .find("li")
          .should("have.length.greaterThan", 0);
      });
  });
});
