const express = require("express");
const cors = require("cors");
const routes = require("./routes");

// Initialize app
const app = express();

// enable cors
app.use(cors());
app.options("*", cors());

app.use(express.json());

// v1 api routes
app.use("/user", routes);

app.listen(5000, () => {
  console.log("Express running on port 5000");
});
