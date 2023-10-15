const express = require("express");
const { connectToDb, getDb } = require("./db");
const { ObjectId } = require("mongodb");

const app = express();
app.use(express.json());

//db connection
let db;

connectToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log("App listening on port: 3000");
    });
    db = getDb();
  }
});

//Get all messages
app.get("/messages", (req, res) => {

  //current page
  const page = req.query.page || 0
  const messagesPerPage = 2

  let messages = [];

  db.collection("messages")
    .find()
    .skip(page * messagesPerPage)
    .limit(messagesPerPage)
    .forEach((message) => messages.push(message))
    .then(() => {
      res.status(200).json(messages);
    })
    .catch(() => {
      console.error("Error fetching documents.", err);
      res.status(500).json({ error: "Could not fetch documents." });
    });
});

//Get one message
app.get("/message/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("messages")
      .findOne({ _id: new ObjectId(req.params.id) })
      .then((message) => {
        if (message) {
          res.status(200).json(message);
        } else {
          res.status(404).json({
            message: "Object with the given ObjectId does not exist.",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not fetch the document." });
      });
  } else {
    res.status(500).json({ error: "Not valid document id." });
  }
});

//Add new message
app.post("/messages", (req, res) => {
  let message = req.body;
  db.collection("messages")
    .insertOne(message)
    .then((result) => {
      res.status(201).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: "Could not create a new document." });
    });
});

//Delete message
app.delete("/messages/:id", (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    db.collection("messages")
      .deleteOne({ _id: new ObjectId(req.params.id) })
      .then((results) => {
        res.status(200).json(results);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not delete the document." });
      });
  } else {
    res.status(500).json({ error: "Not valid document id." });
  }
});

//Update message
app.patch("/messages/:id", (req, res) => {
  const updates = req.body;
  if (ObjectId.isValid(req.params.id)) {
    db.collection("messages")
      .updateOne({ _id: new ObjectId(req.params.id)}, {$set: updates})
      .then((results) => {
        res.status(200).json(results);
      })
      .catch((err) => {
        res.status(500).json({ error: "Could not update the document." });
      });
  } else {
    res.status(500).json({ error: "Not valid document id." });
  }
});