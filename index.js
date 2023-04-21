import express from "express";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import session from "express-session";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	session({
		secret: "test",
		resave: false,
		saveUninitialized: true,
		cookie: { secure: false }
	})
);

app.use(passport.initialize());
app.use(passport.session());

//routes
app.use("/auth/google", authRoutes);

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server Connected to PORT:${PORT}`.bgCyan));
