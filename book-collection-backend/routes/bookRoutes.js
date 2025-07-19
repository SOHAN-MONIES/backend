const express = require("express");
const bookController = require("../controller/bookcontroller");
const router = express.Router();

router
  .route("/")
  .post(bookController.createBook)
  .get(bookController.getAllBooks);

router
  .route("/:id")
  .patch(bookController.updateBook)
  .delete(bookController.deleteBook);
module.exports = router;
