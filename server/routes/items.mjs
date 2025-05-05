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

export default router;