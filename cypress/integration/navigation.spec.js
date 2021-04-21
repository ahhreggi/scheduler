/// <reference types="cypress" />
describe("Navigation", () => {

  it("should visit root", () => {
    cy.visit("/");
  });

  it("should navigate to Tuesday", () => {
    // Visit the root of the web server
    cy.visit("/");
    // Get the list item that contains the text "Tuesday", click on it, then ensure
    // it has the "day-list__item--selected" class
    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.class", "day-list__item--selected");
  });

});