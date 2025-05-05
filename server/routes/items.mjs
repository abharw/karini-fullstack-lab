import express from "express";
import { ObjectId } from "mongodb";
import { getDb } from "../db/conn.mjs";

const router = express.Router();

// Get list of items (50)
router.get("/", async (req, res) => {
  try {
    let collection = getDb().collection("items");
    let results = await collection.find({})
      .limit(50)
      .toArray();

    res.send(results);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).send("Error fetching items");
  }
});

// Get a single item
router.get("/:id", async (req, res) => {
  try {
    let collection = getDb().collection("items");
    let query = {_id: new ObjectId(req.params.id)};
    let result = await collection.findOne(query);
    
    if (!result) {
      return res.status(404).send("Not found");
    }
    
    res.send(result);
  } catch (error) {
    console.error("Error fetching item:", error);
    res.status(500).send("Error fetching item");
  }
});

// create a new item
router.post("/", async (req, res) => {
  try {
    let collection = getDb().collection("items");
    let newItem = req.body;
    let result = await collection.insertOne(newItem);
    
    res.status(201).send(result);
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).send("Error creating item");
  }
});

// update an item
router.patch("/:id", async (req, res) => {
  try {
    let collection = getDb().collection("items");
    let query = {_id: new ObjectId(req.params.id)};
    let updates = {
      $set: req.body
    };
    
    let result = await collection.updateOne(query, updates);
    
    if (result.matchedCount === 0) {
      return res.status(404).send("Not found");
    }
    
    res.send(result);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).send("Error updating item");
  }
});

// delete an item
router.delete("/:id", async (req, res) => {
  try {
    let collection = getDb().collection("items");
    let query = {_id: new ObjectId(req.params.id)};
    
    let result = await collection.deleteOne(query);
    
    if (result.deletedCount === 0) {
      return res.status(404).send("Not found");
    }
    
    res.send(result);
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).send("Error deleting item");
  }
});

export default router;