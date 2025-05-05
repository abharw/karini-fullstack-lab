import express from "express";
import { getDb } from "../db/conn.mjs";

const router = express.Router();

// Search items with various filters
router.get("/", async (req, res) => {
  try {
    const { sku, query, category, minPrice, maxPrice } = req.query;
    
    // Build MongoDB query object
    const mongoQuery = {};
    
    // SKU search (high-priority, exact match)
    if (sku) {
      mongoQuery.variant_sku = { $regex: new RegExp(sku, 'i') };
    }
    
    // Category/type filter
    if (category) {
      mongoQuery.type = { $regex: new RegExp(category, 'i') };
    }
    
    // Price range filter
    if (minPrice !== undefined || maxPrice !== undefined) {
      mongoQuery.variant_price = {};
      
      if (minPrice !== undefined) {
        mongoQuery.variant_price.$gte = parseFloat(minPrice);
      }
      
      if (maxPrice !== undefined) {
        mongoQuery.variant_price.$lte = parseFloat(maxPrice);
      }
    }
    
    // Text search for general queries
    if (query && !sku) {
      // Create a text search if no SKU was provided
      mongoQuery.$or = [
        { title: { $regex: new RegExp(query, 'i') } },
        { body: { $regex: new RegExp(query, 'i') } },
        { vendor: { $regex: new RegExp(query, 'i') } }
      ];
    }
    
    console.log("Search query:", JSON.stringify(mongoQuery));
    
    // Get results from database
    let collection = getDb().collection("items");
    let results = await collection.find(mongoQuery)
      .limit(10) 
      .toArray();
    
    res.send(results);
  } catch (error) {
    console.error("Error searching items:", error);
    res.status(500).send("Error searching items");
  }
});

export default router;