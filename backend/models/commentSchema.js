import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference the User model
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  name:{
    type:String,
    required:true
  }
});

export const Comment = mongoose.model('Comment', commentSchema);
export { commentSchema };
