describe("Members", () => {

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


  it("displays member directory", () => {

    cy.contains("Member Directory")
      .should("be.visible");

    cy.demoWait(1000);

    cy.get("table tbody tr")
      .should("have.length", 4);

    cy.demoWait(1000);
  });


  it("searches members", () => {

    cy.get('[data-testid="member-search"]')
      .type("Aarav", { delay: 100 });

    cy.demoWait(1200);

    cy.get("table tbody tr")
      .should("have.length", 1);

    cy.demoWait(800);

    cy.contains("Aarav Shetty")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("adds a new member", () => {

    cy.contains("+ Add Member")
      .click();

    cy.demoWait(1000);

    cy.contains("Add New Member")
      .should("be.visible");

    cy.demoWait(800);

    cy.get('input[name="name"]')
      .type("Test Member", { delay: 100 });

    cy.demoWait(700);

    cy.get('input[name="email"]')
      .type("test@example.com", { delay: 80 });

    cy.demoWait(700);

    cy.get('input[name="phone"]')
      .type("9999999999", { delay: 100 });

    cy.demoWait(1000);

    cy.get('button[type="submit"]')
      .contains("Add Member")
      .click();

    cy.demoWait(1500);

    cy.contains("Test Member")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("edits a member", () => {

    cy.get("tbody tr")
      .first()
      .find("button")
      .first()
      .click();

    cy.demoWait(1000);

    cy.get('input[name="name"]')
      .clear()
      .type("Updated Aarav", { delay: 100 });

    cy.demoWait(1000);

    cy.contains("Save Changes")
      .click();

    cy.demoWait(1500);

    cy.contains("Updated Aarav")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("deletes a member", () => {

    cy.on("window:confirm", () => true);

    cy.demoWait(800);

    cy.get("tbody tr")
      .first()
      .find("button.danger")
      .click();

    cy.demoWait(1500);

    cy.contains("Aarav Shetty")
      .should("not.exist");

    cy.demoWait(1000);
  });


  it("should require member name", () => {

    cy.contains("Add Member")
      .click();

    cy.demoWait(1000);

    cy.get('input[name="name"]')
      .clear();

    cy.demoWait(800);

    cy.get('button[type="submit"]')
      .click();

    cy.demoWait(1000);

    cy.get('input[name="name"]')
      .should("have.attr", "required");

    cy.demoWait(1000);
  });


  it("should reject phone number with letters", () => {

    cy.contains("Add Member")
      .click();

    cy.demoWait(1000);

    cy.get('input[name="name"]')
      .type("Test Member", { delay: 80 });

    cy.demoWait(600);

    cy.get('input[name="email"]')
      .type("testmember@gmail.com", { delay: 80 });

    cy.demoWait(600);

    cy.get('input[name="phone"]')
      .type("abc123", { delay: 150 });

    cy.demoWait(1000);

    cy.get('button[type="submit"]')
      .click();

    cy.demoWait(1000);

    cy.get('input[name="phone"]')
      .should("have.attr", "pattern", "[0-9]{10}");

    cy.demoWait(1000);
  });


  it("should search members with no matching result", () => {

    cy.get('input[placeholder*="Search"]')
      .type("XYZNOTAMEMBER", { delay: 100 });

    cy.demoWait(1500);

    cy.contains("No members found")
      .should("be.visible");

    cy.demoWait(1000);
  });


  it("should cancel adding a member", () => {

    cy.contains("Add Member")
      .click();

    cy.demoWait(1000);

    cy.get('input[name="name"]')
      .type("Temporary Member", { delay: 100 });

    cy.demoWait(1000);

    cy.contains("Cancel")
      .click();

    cy.demoWait(1200);

    cy.contains("Temporary Member")
      .should("not.exist");

    cy.demoWait(1000);
  });

});