/// <reference types="cypress" />

describe("Cart & Checkout", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");

    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.url().should("include", "/inventory.html");
  });

  it("Add item to Cart", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click();
    cy.get('[data-test="shopping-cart-badge"]')
      .should("be.visible")
      .and("have.text", "1");
  });

  it("Add item to Cart and Checkout", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    cy.get('[data-test="shopping-cart-badge"]')
      .should("be.visible")
      .and("have.text", ("have.text", "1"));
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("Naya");
    cy.get('[data-test="lastName"]').type("Agara");
    cy.get('[data-test="postalCode"]').type("100001");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="finish"]').click();
    cy.contains("Thank you for your order").should("be.visible");
    cy.get('[data-test="back-to-products"]').should("exist");
  });

  it("Add & Remove Item from Cart on Product Page", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]')
      .should("be.visible")
      .and("have.text", ("have.text", "1"));
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
  });

  it("Add & Remove Item from Cart on Cart Page", () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="inventory-item"]')
      .should("have.length", 1)
      .and("contain", "Sauce Labs Backpack");
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-badge"]').should("not.exist");
    cy.get('[data-test="continue-shopping"]').should("be.visible");
    cy.get('[data-test="continue-shopping"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should(
      "be.visible"
    );
  });
});
