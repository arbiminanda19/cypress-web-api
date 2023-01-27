export const validCreateCompanySchema = {
  $schema: "http://json-schema.org/draft-04/schema#",
  type: "object",
  properties: {
    message: {
      type: "string",
    },
    user: {
      type: "object",
    },
    newCompany: {
      type: "object",
    },
    token: {
      type: "string",
    },
  },
  additionalProperties: false,
  required: ["message", "user", "newCompany", "token"],
};
