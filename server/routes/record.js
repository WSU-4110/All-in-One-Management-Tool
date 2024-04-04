import express from "express";

// This will help us connect to the database
import db from "../db/connection.js";

// This help convert the id from string to ObjectId for the _id.
import { ObjectId } from "mongodb";

// router is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by username
router.get("/:username", async (req, res) => {
  try {
    let collection = await db.collection("records");
    let query = { username: req.params.username };
    let result = await collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving record");
  }
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("records");
  let query = { _id: new ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
router.post("/create", async (req, res) => {
  try {
    let newDocument = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      notifications: req.body.notifications,
      locations: req.body.locations,
      tasks: req.body.tasks,
      events: req.body.events,
    };
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding record");
  }
});

// This section will help you update a record by the username provided in the body of the request.
router.patch("/edit", async (req, res) => {
  try {
    let query = { username: req.body.username };
    let updates = {
      $set: {
        email: req.body.email,
        password: req.body.password,
        notifications: req.body.notifications,
        locations: req.body.locations,
        tasks: req.body.tasks,
        events: req.body.events,
      },
    };

    let collection = await db.collection("records");
    let result = await collection.updateOne(query, updates);
    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating record");
  }
});

// // This section will help you update a record by username.
// router.patch("/:username", async (req, res) => {
//   try {
//     const query = { _username: new ObjectId(req.params.username) };
//     const updates = {
//       $set: {
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//         notifications: req.body.notifications,
//         locations: req.body.locations,
//         tasks: req.body.tasks,
//         events: req.body.events,
//       },
//     };

//     let collection = await db.collection("records");
//     let result = await collection.updateOne(query, updates);
//     res.send(result).status(200);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error updating record");
//   }
// });

// This section will help you delete a record by username
router.delete("/:username", async (req, res) => {
  try {
    const query = { _username: new ObjectId(req.params.username) };

    const collection = db.collection("records");
    let result = await collection.deleteOne(query);

    res.send(result).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting record");
  }
});

export default router;