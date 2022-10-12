describe("Navigation", () => {
  it("should navigate to the about page", () => {
    cy.visit("/");

    // click the button attribute containign "btn-about"
    cy.get("a[href*='about']").filter(":visible").click();

    //the new url should include "/about"
    cy.url().should("include", "/about");

    //The new page should contain "about"
    cy.get("h1").contains("About");
  });
});

describe("HomePage", () => {
  it("should load the homepage", () => {
    cy.visit("/");
    cy.get("h1").contains("NASA");
  });
});
