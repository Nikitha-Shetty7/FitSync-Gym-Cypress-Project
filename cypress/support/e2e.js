// Cypress support file

Cypress.Commands.add("demoWait", (ms = 1000) => {
  cy.wait(ms);
});