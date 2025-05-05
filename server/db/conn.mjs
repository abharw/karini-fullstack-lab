import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.ATLAS_URI || "";

const client= new MongoClient(connectionString);

let conn;
let db;

async function connectToDatabase() {
  try {
    conn = await client.connect();
    console.log("Successfully connected to MongoDB.");
    db = conn.db("shopping_items");
    return db;
  } catch(e) {
    console.error("Database connection error:", e);
    throw e;
  }
}

function getDb() {
  if (!db) {
    throw new Error("Database not connected. Call connectToDatabase() first.");
  }
  return db;
}

export {
  connectToDatabase,
  getDb
};