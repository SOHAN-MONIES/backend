const express = require("express");
const morgan = require("morgan");
const bookRouter = require("./routes/bookRoutes");
const app = express();

//Logging api
app.use(morgan("dev"));

// Process incoming requests
app.use(express.json());

app.use("/v1/books", bookRouter);

module.exports = app;
