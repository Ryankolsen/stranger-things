describe("Navigation", () => {
  it("should navigate to the about page", () => {
    cy.visit("/");
    cy.get("img").should("exist");

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

describe("SearchedByDatePage", () => {
  it("should load cached text and images with getStaticPaths", () => {
    cy.visit("/nasa/2015-12-15");
    cy.get("h1").contains("Images From");
    cy.get("img").should("exist");
  });
});
