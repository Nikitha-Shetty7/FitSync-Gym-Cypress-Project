describe("Navigation and logout", () => {

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

    cy.demoWait(1500);
  });


  it("opens all main modules", () => {

    ["Members", "Plans", "Payments", "Attendance", "Reports"].forEach(name => {

      cy.contains(name)
        .click();

      cy.demoWait(1200);

      cy.get("h1")
        .should("contain", name);

      cy.demoWait(1000);
    });

  });


  it("logs out", () => {

    cy.demoWait(1000);

    cy.contains("Logout")
      .click();

    cy.demoWait(1500);

    cy.contains("Welcome back")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("opens Members page", () => {

    cy.contains("Members")
      .click();

    cy.demoWait(1200);

    cy.get("h1")
      .should("contain", "Members");

    cy.demoWait(1000);
  });


  it("opens Plans page", () => {

    cy.contains("Plans")
      .click();

    cy.demoWait(1200);

    cy.get("h1")
      .should("contain", "Plans");

    cy.demoWait(1000);
  });


  it("opens Payments page", () => {

    cy.contains("Payments")
      .click();

    cy.demoWait(1200);

    cy.get("h1")
      .should("contain", "Payments");

    cy.demoWait(1000);
  });


  it("opens Attendance page", () => {

    cy.contains("Attendance")
      .click();

    cy.demoWait(1200);

    cy.get("h1")
      .should("contain", "Attendance");

    cy.demoWait(1000);
  });

});