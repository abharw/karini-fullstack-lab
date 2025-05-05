import express from "express";
import cors from "cors";
import "dotenv/config";

import { connectToDatabase } from "./db/conn.mjs";

// Import routes
import itemsRoutes from "./routes/items.mjs";
import searchRoutes from "./routes/search.mjs"; 

const PORT = process.env.PORT || 5050;
const app = express();

// Middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

// Routes
app.use("/api/items", itemsRoutes);
app.use("/api/search", searchRoutes); 

// Start the server
async function startServer() {
  try {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

startServer();