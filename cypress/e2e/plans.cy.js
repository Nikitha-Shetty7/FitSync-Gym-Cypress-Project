describe("Plans", () => {

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

    cy.contains("Plans")
      .click();

    cy.demoWait(1000);
  });


  it("displays membership plans", () => {

    cy.contains("Basic")
      .should("be.visible");

    cy.demoWait(800);

    cy.contains("Standard")
      .should("be.visible");

    cy.demoWait(800);

    cy.contains("Premium")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("adds a plan", () => {

    cy.contains("+ Add Plan")
      .click();

    cy.demoWait(1000);

    cy.get('input[name="name"]')
      .type("Student", { delay: 100 });

    cy.demoWait(800);

    cy.get('input[type="number"]')
      .type("699", { delay: 120 });

    cy.demoWait(800);

    cy.get('input')
      .last()
      .type("Gym access, Locker", { delay: 80 });

    cy.demoWait(1000);

    cy.contains("Save Plan")
      .click();

    cy.demoWait(1500);

    cy.contains("Student")
      .should("be.visible");

    cy.demoWait(800);

    cy.contains("₹699")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should open Add Plan form", () => {

    cy.contains("+ Add Plan")
      .click();

    cy.demoWait(1200);

    cy.contains("Save Plan")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should require plan name", () => {

    cy.contains("+ Add Plan")
      .click();

    cy.demoWait(1000);

    cy.get('input[name="name"]')
      .clear();

    cy.demoWait(800);

    cy.contains("Save Plan")
      .click();

    cy.demoWait(1000);

    cy.get('input[name="name"]')
      .should("have.attr", "required");

    cy.demoWait(1000);
  });


  it("should reject zero plan price", () => {

    cy.contains("+ Add Plan")
      .click();

    cy.demoWait(1000);

    cy.get('input[name="name"]')
      .type("Test Plan", { delay: 100 });

    cy.demoWait(800);

    cy.get('input[type="number"]')
      .first()
      .clear()
      .type("0");

    cy.demoWait(1000);

    cy.contains("Save Plan")
      .click();

    cy.demoWait(1000);

    cy.get('input[type="number"]')
      .first()
      .should("have.attr", "min", "1");

    cy.demoWait(1000);
  });


  it("should allow plan description", () => {

    cy.contains("+ Add Plan")
      .click();

    cy.demoWait(1000);

    cy.get('input[name="name"]')
      .type("Fitness Plan", { delay: 100 });

    cy.demoWait(800);

    cy.get('input[type="number"]')
      .type("800", { delay: 120 });

    cy.demoWait(800);

    cy.get('input')
      .last()
      .type("Gym access, Cardio and Locker", { delay: 70 });

    cy.demoWait(1000);

    cy.get('input')
      .last()
      .should("have.value", "Gym access, Cardio and Locker");

    cy.demoWait(1000);
  });

});