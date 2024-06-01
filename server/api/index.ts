import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import { routes } from "../src/routes/route";
import { VercelRequest, VercelResponse } from "@vercel/node";

const app = express();

const MONGO_URI = process.env.MONGO_URI || "";

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "*",
  })
);

// Routes
app.use("/", routes);

// Connect to MongoDB
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err: any) => console.log(err));

// Export the express app as a serverless function
export default (req: VercelRequest, res: VercelResponse) => {
  app(req, res);
};
