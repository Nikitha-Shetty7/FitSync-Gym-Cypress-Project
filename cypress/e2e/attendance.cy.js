describe("Attendance", () => {

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

    cy.contains("Attendance")
      .click();

    cy.demoWait(1000);
  });


  it("shows attendance records", () => {

    cy.contains("Attendance")
      .should("be.visible");

    cy.demoWait(1000);

    cy.get("table tbody tr")
      .should("have.length", 3);

    cy.demoWait(1000);
  });


  it("marks attendance", () => {

    cy.contains("+ Mark Attendance")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="time"]')
      .clear()
      .type("09:15", { delay: 120 });

    cy.demoWait(1000);

    cy.contains("Mark Present")
      .click();

    cy.demoWait(1500);

    cy.contains("09:15")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should open Mark Attendance form", () => {

    cy.contains("+ Mark Attendance")
      .click();

    cy.demoWait(1200);

    cy.contains("Mark Present")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should require attendance time", () => {

    cy.contains("+ Mark Attendance")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="time"]')
      .clear();

    cy.demoWait(800);

    cy.contains("Mark Present")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="time"]')
      .should("have.attr", "required");

    cy.demoWait(1000);
  });


  it("should allow attendance at a different time", () => {

    cy.contains("+ Mark Attendance")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="time"]')
      .clear()
      .type("18:30", { delay: 120 });

    cy.demoWait(1000);

    cy.contains("Mark Present")
      .click();

    cy.demoWait(1500);

    cy.contains("18:30")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should display attendance record after check-in", () => {

    cy.contains("+ Mark Attendance")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="time"]')
      .clear()
      .type("12:30", { delay: 120 });

    cy.demoWait(1000);

    cy.contains("Mark Present")
      .click();

    cy.demoWait(1500);

    cy.get("table tbody tr")
      .should("have.length.at.least", 1);

    cy.demoWait(800);

    cy.contains("12:30")
      .should("be.visible");

    cy.demoWait(1000);
  });

});