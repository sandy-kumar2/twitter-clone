import express from "express";
import { createTweet, deleteTweet, likeOrDislike, getAllTweets, getFollowingTweets, bookmark, addComment, deleteComment} from "../controllers/tweetController.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(isAuthenticated, deleteTweet);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);
router.route("/alltweets/:id").get(isAuthenticated, getAllTweets);
router.route("/followerstweets/:id").get(isAuthenticated, getFollowingTweets);
router.route("/bookmark/:id").put(isAuthenticated, bookmark);
router.route("/comment/:id").post(isAuthenticated, addComment);
router.route("/deletecomment/:tweetId/:commentId").delete(isAuthenticated, deleteComment);

export default router;