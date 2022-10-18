const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const _ = require("lodash");
const { v4: uuid } = require("uuid");

const app = express();

// allows for json support
app.use(express.json());

// enables cors
app.use(express.cors());

// defines a new outfit GET endpoint
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

//defines a GET endpoint by id
app.get("/comments/:id", async (req, res) => {
  const id = req.params.id;
  let content;

  try {
    content = await fs.readFile(`data/comments/${id}.txt`, "utf-8");
  } catch (err) {
    // 404: Not found
    return res.sendStatus(404);
  }

  res.json({
    content: content,
  });
});

// defines a new POST endpoint
app.post("/comments", async (req, res) => {
  const id = uuid();
  const content = req.body.content;

  if (!content) {
    // 400: Bad request
    return res.sendStatus(400);
  }

  // makes a comments directory
  await fs.mkdir("data/comments", { recursive: true });
  // makes a comment file with content
  await fs.writeFile(`data/comments/${id}.txt`, content);

  // 201: object successfully created
  res.status(201).json({
    id: id,
  });
});

app.listen(3000, () => console.log("API Server is running..."));
