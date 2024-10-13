import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectToDatabase from './config/database.mjs';
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
const db = await connectToDatabase();
app.use(cors());
app.use(express.json());


// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});