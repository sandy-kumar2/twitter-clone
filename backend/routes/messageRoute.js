import express from "express";
import { getMessage, sendMessage } from "../controllers/messageController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/send/:id").post(isAuthenticated, sendMessage); // Send message to a particular user ID
router.route("/:id").get(isAuthenticated, getMessage); // Get messages with a particular user ID

export default router;
