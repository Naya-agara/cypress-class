/// <reference types="cypress" />

describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
  });

  it("Valid Login", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
  });
  it("Verify that an error message is displayed for locked out user", () => {
    cy.get("#user-name").type("locked_out_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: Sorry, this user has been locked out.");
  });

  it("Verify that an error message is displayed for invalid username", () => {
    cy.get("#user-name").type("invalid_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: Username and password do not match");
  });

  it("Verify that an error message is displayed for invalid password", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("wrong_password");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: Username and password do not match");
  });

  it("Verify that an error message is displayed when both fields are empty", () => {
    cy.get("#login-button").click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: Username is required");
  });

  it("Verify that an error message is displayed when only password is entered", () => {
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: Username is required");
  });

  it("Verify that an error message is displayed when only username is entered", () => {
    cy.get("#user-name").type("standard_user");
    cy.get("#login-button").click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "Epic sadface: Password is required");
  });

  it("Verify that the error message clears when you click on the error cancel button", () => {
    cy.get("#login-button").click();
    cy.get('[data-test="error"]').should("be.visible");
    cy.get(".error-button").click();
    cy.get('[data-test="error"]').should("not.exist");
  });
});
