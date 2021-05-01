const express = require("express");
const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");

const app = express();

// body parser
app.use(express.json());
// cors middleware

app.use(cors());
const posts = {};
// {{id1},{id2}}

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  console.log("here>>", title);
  posts[id] = {
    id,
    title,
  };
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(4000, () => console.log("Listening on 4000"));
