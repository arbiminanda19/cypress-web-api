const fs = require("fs");
import mime from "mime-types";

export const uploadProfileImage = {
  //identity_image
  type: "image",
  file: {
    value: cy.readFile("./image_test.png"),
    options: {
      filename: "image_test.png",
      contentType: mime.contentType("letter_of_attorney.png"),
    },
  },
};
