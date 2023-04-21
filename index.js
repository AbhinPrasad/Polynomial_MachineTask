import express from "express";
import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connectDB()

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server Connected to PORT:${PORT}`.bgCyan));
