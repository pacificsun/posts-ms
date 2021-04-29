const express = require("express");
const { randomBytes } = require("crypto");

const cors = require("cors");

const app = express();

// body parser
app.use(express.json());
// cors middleware

app.use(cors());
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  console.log("here>>", title);
  posts[id] = {
    id,
    title,
  };
  res.status(201).send(posts[id]);
});

app.listen(4000, () => console.log("Listening on 4000"));
