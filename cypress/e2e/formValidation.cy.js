describe("Checkout Form Validation", () => {
  beforeEach(() => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click();
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
  });

  it("Verify that an error message is displayed when submitting empty form", () => {
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]')
      .should("be.visible")
      .and("contain", "First Name is required");
    cy.url().should("include", "/checkout-step-one.html");
  });

  it("Verify that an error message is displayed for missing fields", () => {
    // Test first name missing
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("contain", "First Name is required");

    // Test last name missing
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').clear();
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("contain", "Last Name is required");

    // Test postal code missing
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').clear();
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("contain", "Postal Code is required");
  });

  it.only("Verify that the errors clear when fixing fields", () => {
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should("contain", "Last Name is required");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();
    cy.url().should("include", "/checkout-step-two.html");
  });

  it("Validate elements on the checkout overview page", () => {
    cy.get('[data-test="firstName"]').type("John");
    cy.get('[data-test="lastName"]').type("Doe");
    cy.get('[data-test="postalCode"]').type("12345");
    cy.get('[data-test="continue"]').click();

    // Header
    cy.get(".header_container").should("be.visible");
    cy.get(".title").should("contain", "Checkout: Overview");

    // Cart contents
    cy.get(".cart_list").should("be.visible");
    cy.get(".cart_item").should("have.length.at.least", 1);

    // Summary section
    cy.get(".summary_info").should("be.visible");
    cy.get(".summary_subtotal_label").should("contain", "Item total");
    cy.get(".summary_tax_label").should("contain", "Tax");
    cy.get(".summary_total_label").should("contain", "Total");

    // Action buttons
    cy.get('[data-test="cancel"]').should("contain", "Cancel");
    cy.get('[data-test="finish"]').should("contain", "Finish");
  });
});
