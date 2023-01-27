require("cypress-xpath");
import * as objects from "./objects/pages.js";
import * as config from "./config/env.js";

describe("Orange HR Test", () => {
  it("Login Case", () => {
    cy.config("defaultCommandTimeout", 10000);
    cy.visit(config.baseUrl);
    cy.wait(100); //wait in miliseconds
    cy.get(objects.input_userName).type("Admin"); //by xpath
    cy.xpath("//input[@name='password']").type("admin123"); //by regular xpath
    cy.xpath("//button[@type='submit']").click();
    cy.xpath("//a[contains(@href, 'Recruitment')]/parent::li").should(
      "be.visible"
    ); //assert visibility element
  });
});
