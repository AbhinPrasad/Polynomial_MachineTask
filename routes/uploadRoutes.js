import express from "express";
import { fileUpload } from "../controllers/uploadController.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", isLoggedIn, fileUpload);

export default router;
