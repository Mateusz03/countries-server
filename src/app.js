const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { countries } = require("./routes/countriesTable.routes.js");
const { conversion } = require("./routes/conversion.routes.js");
const { calculation } = require("./routes/calculation.routes.js");

app.use("/countries", countries);
app.use("/price", conversion);
app.use("/price", calculation);

module.exports = app;
