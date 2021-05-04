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

// get post

app.get("/posts", (req, res) => {
  res.send(posts);
});

// To Create Post and it is send to event bus
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

// to Recieve event from event bus
app.post("/events", (req, res) => {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(4000, () => console.log("Listening on 4000"));
