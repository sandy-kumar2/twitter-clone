import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  followers: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      name: {
        type: String,
        required: true
      }
    }
  ],
  following: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      },
      name: {
        type: String,
        required: true
      }
    }
  ],
  description: {
    type: String,
    default: "Add Bio"
  }
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
export { userSchema };