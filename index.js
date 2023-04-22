import express from "express";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import passport from "passport";
import session from "express-session";
import multer from "multer";

//multer file size configuration -- 50 * 1024 * 1024 => 50MB in bytes.
const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } });

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

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
app.use("/upload", upload.single("file"), uploadRoutes);

connectDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server Connected to PORT:${PORT}`.bgCyan));
