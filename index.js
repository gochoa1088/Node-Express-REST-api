const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

// allows for json support
app.use(express.json());

// defines a new GET endpoint
app.get("/outfit", (req, res) => {
  const tops = ["Black", "White", "Orange", "Navy"];
  const jeans = ["Grey", "Dark Grey", "Black", "Navy"];
  const shoes = ["Black", "Grey", "Black", "Brown"];

  // returns the data
  res.json({
    top: _.sample(tops),
    jeans: _.sample(jeans),
    shoes: _.sample(shoes),
  });
});

// defines a new POST endpoint
app.post("/comments", async (req, res) => {
  const id = uuid();
  const content = req.body.content;

  if (!content) {
    // 400: Not found, bad request
    return res.sendStatus(400);
  }

  // makes a comments directory
  await fs.mkdir("data/comments", { recursive: true });
  // makes a comment file with content
  await fs.writeFile(`data/comments/${id}.txt`, content);

  // 201: object successfully created
  res.sendStatus(201);
});

app.listen(3000, () => console.log("API Server is running..."));
