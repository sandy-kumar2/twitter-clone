import {Tweet} from "../models/tweetSchema.js";
import { User } from "../models/userSchema.js";
import { Comment } from "../models/commentSchema.js";

export const createTweet = async(req, res) => {
    try{
        const {description, id} = req.body;
        if(!description || !id)
        {
            return res.status(401).json({
                message:"Fields are require",
                success: false
            })
        };

        const user = await User.findById(id).select("-password");
        await Tweet.create({
            description,
            userId: id,
            userDetails: user,
        });

        return res.status(201).json({
            message:"Tweet created successfully.",
            success: true
        })
    } catch(error) {
        console.log(error);
    }
}

export const deleteTweet = async(req, res) => {
    try {
        const{id} = req.params;
        await Tweet.findByIdAndDelete(id);
        return res.status(200).json({
            message:"Tweet deleted succesfully",
            success: true
        })
    } catch(error)
    {
        console.log(error);
    }
}

export const likeOrDislike = async(req, res) => {
    try {
      const loggedInUserId = req.body.id;
      const tweetId = req.params.id;
      const tweet = await Tweet.findById(tweetId);
      if(tweet.like.includes(loggedInUserId))
      {
        //dislike
        await Tweet.findByIdAndUpdate(tweetId, {$pull: {like: loggedInUserId}});
        return res.status(200).json({
            message:"User disliked your tweet."
        })
      }
      else 
      {
        //like
        await Tweet.findByIdAndUpdate(tweetId, {$push: {like: loggedInUserId}});
        return res.status(200).json({
            message: "User liked your tweet",
        })
      }

    } catch(error) {
        console.log(error);
    }
}

export const bookmark = async(req, res) => {
    try {
      const loggedInUserId = req.body.id;
      const tweetId = req.params.id;
      const tweet = await Tweet.findById(tweetId);
      if(tweet.bookmarks.includes(loggedInUserId))
      {
        //dislike
        await Tweet.findByIdAndUpdate(tweetId, {$pull: {bookmarks: loggedInUserId}});
        return res.status(200).json({
            message:"Removed from Bookmark"
        })
      }
      else 
      {
        //like
        await Tweet.findByIdAndUpdate(tweetId, {$push: {bookmarks: loggedInUserId}});
        return res.status(200).json({
            message: "Bookmark Added",
        })
      }

    } catch(error) {
        console.log(error);
    }
}

export const getAllTweets = async (req,res) => {
    // loggedInUser ka tweet + following user tweet
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id);
        const loggedInUserTweets = await Tweet.find({userId:id});
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:loggedInUserTweets.concat(...followingUserTweet),
        })
    } catch (error) {
        console.log(error);
    }
}

export const getFollowingTweets = async (req,res) =>{
    try {
        const id = req.params.id;
        const loggedInUser = await User.findById(id); 
        const followingUserTweet = await Promise.all(loggedInUser.following.map((otherUsersId)=>{
            return Tweet.find({userId:otherUsersId});
        }));
        return res.status(200).json({
            tweets:[].concat(...followingUserTweet)
        });
    } catch (error) {
        console.log(error);
    }
}

export const addComment = async (req, res) => {
    try {
        const { text, userId } = req.body;
        const tweetId = req.params.id;

        if (!text || !userId) {
            return res.status(400).json({
                message: "Text and User ID are required",
                success: false
            });
        }

        const tweet = await Tweet.findById(tweetId);
        if (!tweet) {
            return res.status(404).json({
                message: "Tweet not found",
                success: false
            });
        }

        const user = await User.findById(userId).select('username');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const newComment = new Comment({
            userId,
            name: user.username,
            text,
            createdAt: new Date()
        });

        await newComment.save(); // Save the new comment to the database
        tweet.comments.push(newComment); // Add the new comment to the comments array in the tweet
        await tweet.save(); // Save the updated tweet with the new comment

        return res.status(201).json({
            message: "Comment created and added successfully",
            success: true,
            tweet
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};

export const deleteComment = async(req, res) => {
  const { tweetId, commentId } = req.params;
  console.log("deleteComment: " + tweetId + " --- " + commentId);
  try {
    // Find the tweet by its ID
    const tweet = await Tweet.findById(tweetId);
    if (!tweet) {
      return res.status(404).json({ message: 'Tweet not found' });
    }

    // Check if the comment exists in the tweet and belongs to the authenticated user
    const commentIndex = tweet.comments.findIndex(comment => comment._id.toString() === commentId);
    if (commentIndex === -1) {
      return res.status(403).json({ message: 'Unauthorized access' });
    }

    // Remove the comment from the tweet
    tweet.comments.splice(commentIndex, 1);
    await tweet.save();

    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}