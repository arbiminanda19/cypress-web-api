require("cypress-xpath");

describe("Orange HR Test", () => {
  it("Login Case", () => {
    cy.config("defaultCommandTimeout", 10000);
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.wait(100); //wait in miliseconds
    cy.get('input[name="username"]').type("Admin"); //by xpath
    cy.xpath("//input[@name='password']").type("admin123"); //by regular xpath
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//a[contains(@href, 'Recruitment')]/parent::li").should(
      "be.visible"
    ); //assert visibility element
  });
});
