describe("Membership Renewal", () => {

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

    cy.contains("Members")
      .click();

    cy.demoWait(1000);
  });


  it("displays the Renew button for members", () => {

    cy.contains("Renew")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("opens the renewal form", () => {

    cy.contains("Renew")
      .first()
      .click();

    cy.demoWait(1200);

    cy.contains("Renew Membership")
      .should("be.visible");

    cy.demoWait(800);

    cy.contains("Renewal Date")
      .should("be.visible");

    cy.demoWait(800);

    cy.contains("Renewal Amount")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("shows the selected member in renewal form", () => {

    cy.contains("tr", "Rahul Kumar")
      .within(() => {
        cy.contains("Renew")
          .click();
      });

    cy.demoWait(1200);

    cy.get('input[disabled]')
      .first()
      .should("have.value", "Rahul Kumar");

    cy.demoWait(1000);
  });


  it("allows changing the membership plan", () => {

    cy.contains("Renew")
      .first()
      .click();

    cy.demoWait(1000);

    cy.get("select")
      .first()
      .select("Premium");

    cy.demoWait(1200);

    cy.get("select")
      .first()
      .should("have.value", "Premium");

    cy.demoWait(1000);
  });


  it("allows changing the payment method", () => {

    cy.contains("Renew")
      .first()
      .click();

    cy.demoWait(1000);

    cy.get("select")
      .last()
      .select("Card");

    cy.demoWait(1200);

    cy.get("select")
      .last()
      .should("have.value", "Card");

    cy.demoWait(1000);
  });


  it("calculates the new expiry date", () => {

    cy.contains("tr", "Rahul Kumar")
      .within(() => {
        cy.contains("Renew")
          .click();
      });

    cy.demoWait(1200);

    cy.get('input[disabled]')
      .last()
      .should("have.value", "2026-11-01");

    cy.demoWait(1200);
  });


  it("renews an expired membership successfully", () => {

    cy.contains("tr", "Rahul Kumar")
      .within(() => {
        cy.contains("Renew")
          .click();
      });

    cy.demoWait(1200);

    cy.get("button")
      .contains("Renew Membership")
      .click();

    cy.demoWait(1500);

    cy.contains("tr", "Rahul Kumar")
      .should("contain", "Active");

    cy.demoWait(1000);
  });


  it("adds a renewal payment", () => {

    cy.contains("tr", "Rahul Kumar")
      .within(() => {
        cy.contains("Renew")
          .click();
      });

    cy.demoWait(1200);

    cy.get("button")
      .contains("Renew Membership")
      .click();

    cy.demoWait(1500);

    cy.contains("Payments")
      .click();

    cy.demoWait(1200);

    cy.get("table tbody tr")
      .should("have.length", 4);

    cy.demoWait(800);

    cy.contains("Rahul Kumar")
      .should("be.visible");

    cy.demoWait(800);

    cy.contains("₹999")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("can cancel the renewal", () => {

    cy.contains("Renew")
      .first()
      .click();

    cy.demoWait(1200);

    cy.contains("Cancel")
      .click();

    cy.demoWait(1200);

    cy.contains("Renew Membership")
      .should("not.exist");

    cy.demoWait(1000);
  });


  it("requires a renewal date", () => {

    cy.contains("Renew")
      .first()
      .click();

    cy.demoWait(1200);

    cy.get('input[type="date"]')
      .should("have.attr", "required");

    cy.demoWait(1000);

    cy.get('input[type="date"]')
      .invoke("val", "")
      .trigger("change");

    cy.demoWait(1000);

    cy.get('input[type="date"]')
      .should("have.attr", "required");

    cy.demoWait(1000);
  });

});