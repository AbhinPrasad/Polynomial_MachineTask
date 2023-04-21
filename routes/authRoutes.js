import express from "express";
import passport from "passport";
const router = express.Router();
import "../utils/passport.js";
import { isLoggedIn } from "../middleware/authMiddleware.js";
import { loginFailure, loginSuccess } from "../controllers/authController.js";

router.get(
	"/",
	passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
	"/callback",
	passport.authenticate("google", {
		successRedirect: "/auth/google/success",
		failureRedirect: "/auth/google/failure"
	})
);

router.get("/success", isLoggedIn, loginSuccess);
router.get("/failure", loginFailure);

export default router;
