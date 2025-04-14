import express from "express";
import {Register, Login, logout, getMyProfile, getOtherUsers, follow, unfollow,updateProfile, getNumberOfFollowers, searchUser} from "../controllers/userController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);
router.route("/follow/:id").post(isAuthenticated, follow);
router.route("/unfollow/:id").post(isAuthenticated, unfollow);
router.route("/updateProfile").post(updateProfile);
router.route("/followers/:id").get(isAuthenticated, getNumberOfFollowers);
router.route("/search/:username").get(isAuthenticated, searchUser);

export default router;