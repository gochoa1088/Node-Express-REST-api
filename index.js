const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

//deines a new endpoint
app.get("/outfit", (req, res) => {
  const tops = ["Black", "White", "Orange", "Navy"];
  const jeans = ["Grey", "Dark Grey", "Black", "Navy"];
  const shoes = ["Black", "Grey", "Black", "Brown"];

  res.json({
    top: _.sample(tops),
    jeans: _.sample(jeans),
    shoes: _.sample(shoes),
  });
});

app.listen(3000, () => console.log("API Server is running..."));
