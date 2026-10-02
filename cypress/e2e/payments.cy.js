describe("Payments", () => {

  beforeEach(() => {
    cy.clearLocalStorage();

    cy.visit("/");
    cy.demoWait(1000);

    cy.get('[data-testid="email"]')
      .type("admin@ironpulse.com", { delay: 80 });

    cy.demoWait(800);

    cy.get('[data-testid="password"]')
      .type("admin123", { delay: 100 });

    cy.demoWait(800);

    cy.get('[data-testid="login-form"]')
      .submit();

    cy.demoWait(1200);

    cy.contains("Payments")
      .click();

    cy.demoWait(1000);
  });


  it("displays payments", () => {

    cy.contains("Payments")
      .should("be.visible");

    cy.demoWait(1000);

    cy.get("table tbody tr")
      .should("have.length", 3);

    cy.demoWait(1000);
  });


  it("searches payments", () => {

    cy.get('[data-testid="payment-search"]')
      .type("Aarav", { delay: 100 });

    cy.demoWait(1500);

    cy.get("table tbody tr")
      .should("have.length", 1);

    cy.demoWait(800);
  });


  it("records a payment", () => {

    cy.contains("+ Record Payment")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="number"]')
      .type("1500", { delay: 120 });

    cy.demoWait(1000);

    cy.contains("Save Payment")
      .click();

    cy.demoWait(1500);

    cy.contains("₹1,500")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should open Record Payment form", () => {

    cy.contains("+ Record Payment")
      .click();

    cy.demoWait(1200);

    cy.contains("Save Payment")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should require payment amount", () => {

    cy.contains("+ Record Payment")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="number"]')
      .clear();

    cy.demoWait(800);

    cy.contains("Save Payment")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="number"]')
      .should("have.attr", "required");

    cy.demoWait(1000);
  });


  it("should reject negative payment amount", () => {

    cy.contains("+ Record Payment")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="number"]')
      .clear()
      .type("-500", { delay: 150 });

    cy.demoWait(1000);

    cy.contains("Save Payment")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="number"]')
      .should("have.attr", "min", "1");

    cy.demoWait(1000);
  });


  it("should show no results for invalid payment search", () => {

    cy.get('[data-testid="payment-search"]')
      .type("XYZNOTAPAYMENT", { delay: 100 });

    cy.demoWait(1500);

    cy.get("table tbody tr")
      .should("have.length", 0);

    cy.demoWait(1000);
  });

});