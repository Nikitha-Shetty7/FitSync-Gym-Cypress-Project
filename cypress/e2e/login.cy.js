describe("Login", () => {

  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/");

    cy.demoWait(1000);
  });

  it("shows login page", () => {

    cy.contains("Welcome back")
      .should("be.visible");

    cy.demoWait(1000);

    cy.get('[data-testid="email"]')
      .should("be.visible");

    cy.demoWait(1000);

    cy.get('[data-testid="password"]')
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("rejects invalid credentials", () => {

    cy.get('[data-testid="email"]')
      .type("wrong@test.com", { delay: 80 });

    cy.demoWait(1000);

    cy.get('[data-testid="password"]')
      .type("wrong123", { delay: 100 });

    cy.demoWait(1000);

    cy.get('[data-testid="login-form"]')
      .submit();

    cy.demoWait(1200);

    cy.contains("Invalid email or password.")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("logs in with valid credentials", () => {

    cy.get('[data-testid="email"]')
      .type("admin@ironpulse.com", { delay: 80 });

    cy.demoWait(1000);

    cy.get('[data-testid="password"]')
      .type("admin123", { delay: 100 });

    cy.demoWait(1000);

    cy.get('[data-testid="login-form"]')
      .submit();

    cy.demoWait(1500);

    cy.contains("FitSync")
      .should("be.visible");

    cy.demoWait(1000);

    cy.contains("Train hard.")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should show validation when fields are empty", () => {

    cy.get('[data-testid="email"]')
      .clear();

    cy.demoWait(800);

    cy.get('[data-testid="password"]')
      .clear();

    cy.demoWait(800);

    cy.get('[data-testid="login-form"]')
      .submit();

    cy.demoWait(1000);

    cy.get('[data-testid="email"]')
      .should("have.attr", "required");

    cy.demoWait(800);

    cy.get('[data-testid="password"]')
      .should("have.attr", "required");

    cy.demoWait(1000);
  });


  it("should reject wrong password", () => {

    cy.get('[data-testid="email"]')
      .type("admin@ironpulse.com", { delay: 80 });

    cy.demoWait(1000);

    cy.get('[data-testid="password"]')
      .type("wrongpassword", { delay: 100 });

    cy.demoWait(1000);

    cy.get('[data-testid="login-form"]')
      .submit();

    cy.demoWait(1200);

    cy.contains("Invalid email or password.")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should reject wrong username", () => {

    cy.get('[data-testid="email"]')
      .type("wrong@ironpulse.com", { delay: 80 });

    cy.demoWait(1000);

    cy.get('[data-testid="password"]')
      .type("admin123", { delay: 100 });

    cy.demoWait(1000);

    cy.get('[data-testid="login-form"]')
      .submit();

    cy.demoWait(1200);

    cy.contains("Invalid email or password.")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should logout successfully", () => {

    cy.get('[data-testid="email"]')
      .type("admin@ironpulse.com", { delay: 80 });

    cy.demoWait(1000);

    cy.get('[data-testid="password"]')
      .type("admin123", { delay: 100 });

    cy.demoWait(1000);

    cy.get('[data-testid="login-form"]')
      .submit();

    cy.demoWait(1500);

    cy.contains("FitSync")
      .should("be.visible");

    cy.demoWait(1000);

    cy.contains("Logout")
      .click();

    cy.demoWait(1200);

    cy.contains("Welcome back")
      .should("be.visible");

    cy.demoWait(1000);
  });

});