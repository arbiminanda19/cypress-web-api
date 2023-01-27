let stringSimilarity = require("string-similarity");
let companyId;
let userId = "63d342315e21ed5f936f6e6c";
let token =
  "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzZDM0MjMxNWUyMWVkNWY5MzZmNmU2YyIsImdvb2dsZUlkIjoiMTAxMTE5MDM5MjM4ODQ5NDM1NjI0IiwiZW1haWwiOiJhcmJpbWluYW5kYTE5QGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQXJiaSBNaW5hbmRhIiwicGhvdG9VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BRWRGVHA2T2VZWnl2MEQ5THBEQVdENzk4a1JqZUhIQkxSOW56dGNLc3FMTD1zOTYtYyIsImJpbyI6IiIsInN0YXR1cyI6IiIsImRlZmF1bHRDb21wYW55IjpudWxsLCJjcmVhdGVkQXQiOiIyMDIzLTAxLTI3VDAzOjE3OjA1LjIwOVoiLCJ1cGRhdGVkQXQiOiIyMDIzLTAxLTI3VDAzOjE3OjA1LjIwOVoiLCJfX3YiOjB9LCJpYXQiOjE2NzQ3ODk0MjksImV4cCI6MTY3NzM4MTQyOX0.pNdvVjp1LRmeUHYB_fYqRw8CcSFvfxTTIgF42s_Qh-A";
let baseUrl = "https://stagingapi.cicle.app";
import * as data from "./data/company.js";
import * as schema from "./schema/company.js";

describe("API Cicle Staging - Companies", () => {
  it("POST - Create Company", () => {
    cy.request({
      method: "POST",
      url: baseUrl + "/api/v1/companies",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: data.createCompanyData,
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal(
        "Successfully create company user"
      );
      companyId = response.body.newCompany._id;
      expect(response.body).to.be.jsonSchema(schema.validCreateCompanySchema);
    });
  });

  it("GET - Companies", () => {
    cy.request({
      method: "GET",
      url: baseUrl + "/api/v1/companies",
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      let foundCompany = false;
      let i = 0;
      do {
        foundCompany = stringSimilarity.compareTwoStrings(
          response.body.companies[i]._id,
          companyId
        );
        i++;
      } while (!foundCompany);
    });
  });

  it("DELETE - Delete Company", () => {
    cy.request({
      method: "DELETE",
      url: baseUrl + "/api/v1/companies/" + companyId,
      headers: {
        Authorization: token,
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });

  it("POST - Change User Profile", () => {
    cy.fixture("./img/image_test.png", "binary")
      .then((file) => Cypress.Blob.binaryStringToBlob(file))
      .then((blob) => {
        var formdata = new FormData();
        formdata.append("file", blob, "./img/image_test.png");
        formdata.append("type", "image");
        cy.request({
          url: baseUrl + "/api/v1/users/" + userId + "/photo",
          method: "POST",
          headers: {
            Authorization: token,
          },
          body: formdata,
        }).then((response) => {
          expect(response.status).to.equal(200);
        });
      });
  });
});
