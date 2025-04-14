import mongoose from 'mongoose';
import { commentSchema } from './commentSchema.js';

const tweetSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  like: {
    type: Array,
    default: []
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userDetails: {
    type: Object,
    default: {}
  },
  bookmarks: {
    type: Array,
    default: []
  },
  comments: [commentSchema]
}, { timestamps: true });

export const Tweet = mongoose.model('Tweet', tweetSchema);
