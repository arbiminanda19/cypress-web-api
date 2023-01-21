var stringSimilarity = require("string-similarity");
var companyId;

describe("API Cicle Staging - Companies", () => {
  it("POST - Create Company", () => {
    cy.request({
      method: "POST",
      url: "https://stagingapi.cicle.app/api/v1/companies",
      headers: {
        Authorization:
          "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNDgwNDA0MmUyMGQ4OGIyODkwOGViOCIsImdvb2dsZUlkIjoiMTAzMzQzMzkyMDUwMDcxMTg5NjY0IiwiZW1haWwiOiJhcmJpbWluYW5kYTQ5QGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQXJiaSBNaW5hbmRhIiwicGhvdG9VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BTG01d3UxOXpQWGVhaW5aeE8wMFRBZXQwcGg5LUNPSjNoalNqMDFZTUZDSj1zOTYtYyIsImJpbyI6IiIsInN0YXR1cyI6IiIsImRlZmF1bHRDb21wYW55IjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTEwLTEzVDEyOjI2OjQ0LjA4MVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTEwLTIxVDE0OjAzOjAyLjAzOVoiLCJfX3YiOjB9LCJpYXQiOjE2NzI5ODY5NTgsImV4cCI6MTY3NTU3ODk1OH0.lQkZxBRCooC756iXDANAuWQskFCBg0ftjITFYL3K6og",
        "Content-Type": "application/json",
      },
      body: {
        name: "test",
        desc: "desc",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal(
        "Successfully create company user"
      );
      companyId = response.body.newCompany._id;
    });
  });

  it("GET - Companies", () => {
    cy.request({
      method: "GET",
      url: "https://stagingapi.cicle.app/api/v1/companies",
      headers: {
        Authorization:
          "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNDgwNDA0MmUyMGQ4OGIyODkwOGViOCIsImdvb2dsZUlkIjoiMTAzMzQzMzkyMDUwMDcxMTg5NjY0IiwiZW1haWwiOiJhcmJpbWluYW5kYTQ5QGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQXJiaSBNaW5hbmRhIiwicGhvdG9VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BTG01d3UxOXpQWGVhaW5aeE8wMFRBZXQwcGg5LUNPSjNoalNqMDFZTUZDSj1zOTYtYyIsImJpbyI6IiIsInN0YXR1cyI6IiIsImRlZmF1bHRDb21wYW55IjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTEwLTEzVDEyOjI2OjQ0LjA4MVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTEwLTIxVDE0OjAzOjAyLjAzOVoiLCJfX3YiOjB9LCJpYXQiOjE2NzI5ODY5NTgsImV4cCI6MTY3NTU3ODk1OH0.lQkZxBRCooC756iXDANAuWQskFCBg0ftjITFYL3K6og",
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
      url: "https://stagingapi.cicle.app/api/v1/companies/" + companyId,
      headers: {
        Authorization:
          "jwt eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYzNDgwNDA0MmUyMGQ4OGIyODkwOGViOCIsImdvb2dsZUlkIjoiMTAzMzQzMzkyMDUwMDcxMTg5NjY0IiwiZW1haWwiOiJhcmJpbWluYW5kYTQ5QGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoiQXJiaSBNaW5hbmRhIiwicGhvdG9VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BTG01d3UxOXpQWGVhaW5aeE8wMFRBZXQwcGg5LUNPSjNoalNqMDFZTUZDSj1zOTYtYyIsImJpbyI6IiIsInN0YXR1cyI6IiIsImRlZmF1bHRDb21wYW55IjpudWxsLCJjcmVhdGVkQXQiOiIyMDIyLTEwLTEzVDEyOjI2OjQ0LjA4MVoiLCJ1cGRhdGVkQXQiOiIyMDIyLTEwLTIxVDE0OjAzOjAyLjAzOVoiLCJfX3YiOjB9LCJpYXQiOjE2NzI5ODY5NTgsImV4cCI6MTY3NTU3ODk1OH0.lQkZxBRCooC756iXDANAuWQskFCBg0ftjITFYL3K6og",
      },
    }).then((response) => {
      expect(response.status).to.equal(200);
    });
  });
});
