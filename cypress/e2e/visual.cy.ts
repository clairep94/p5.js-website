import "@percy/cypress";
const URL = "https://p5js.org/";

Cypress.on("uncaught:exception", (err) => {
  if (err.message.includes("ResizeObserver loop completed")) {
    return false;
  }
});

describe("Integration test with visual testing", () => {
  it("Loads the homepage", () => {
    // Load the page or perform any other interactions with the app.
    cy.visit(URL);
    // Take a snapshot for visual diffing
    cy.percySnapshot("Homepage responsive test", { widths: [768, 992, 1200] });
  });
});
