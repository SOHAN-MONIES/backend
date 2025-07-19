const app = require("./index.js");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

// DOTENV CONFIG TO READ PROCESS ENVIRONMENT VARIABLES
dotenv.config({ path: "./.env" });

//CONNECT MONGOD USING MONGOOSE
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.error(err);
  });

// SERVER
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
