import {User} from "../models/userSchema.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Register = async (req, res) => {
  try{
    const {name, username, email, password} = req.body;
    //basic validation
    if(!name || !username || !email || !password)
    {
      return res.status(401).json ({
        message:"All fields are required.",
        success: false
      })
    }

    const user = await User.findOne({email});
    if(user)
    {
      return res.status(401).json({
        message:"User Already exist",
        success: false
      })
    }

    const hashedPassword = await bcryptjs.hash(password, 16);

    await User.create({
      name,
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).json ({
      message:"Account created successfully",
      success: true
    })
  } catch(error) {
    console.log(error);
  }
};

export const Login = async(req, res) => {
  try{
    const{email, password} = req.body;
    if(!email || !password)
    {
      return res.status(401).json({
        message:"All feilds are required",
        success: false
      })
    };

    const user = await User.findOne({email})
    if(!user)
    {
      return res.status(401).json({
        message: "User does not exist with the given email",
        success: false
      })
    };

    const isMatch = await bcryptjs.compare(password, user.password);
    if(!isMatch)
    {
      return res.status(401).json({
        message:"Incorrect email or password",
        success: false
      })
    }
    const tokenData = {
      userId: user._id
    }
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1d" });
    return res.status(201).cookie("token", token, {expireIn: "1d", httpOnly: true}).json({
      message: `Welcome back ${user.name}`,
      user,
      success: true
    })
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  return res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
    message: "user logged out successfully.",
    success: true
  })
};

export const getMyProfile = async (req, res) => {
  try{
    const id = req.params.id;
    const user = await User.findById(id).select("-password");
    console.log('User not found:', id); // Debugging log
    return res.status(200).json({
      user,
    }) 
  } catch (error) {    
    console.log(error);
  }
}

export const getOtherUsers = async (req, res) => {
  try{
    const{id} = req.params;
    const otherUsers = await User.find({_id: {$ne: id}}).select("-password");
    if(!otherUsers)
    {
      return res.status(401).json({
        message: "Currently do not have any users"
      })
    };
    return res.status(200).json({
      otherUsers
    })
  } catch(error)
  {
    console.log(error);
  }
}

export const follow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id; // sandeep id
    const userId = req.params.id; // nikita
    const loggedInUser = await User.findById(loggedInUserId); // sandeep
    const user = await User.findById(userId); // nikita

    // Check if already following
    const isAlreadyFollowing = user.followers.some(
      (follower) => follower.id.toString() === loggedInUserId
    );

    if (!isAlreadyFollowing) {
      await user.updateOne({
        $push: { followers: { id: loggedInUserId, name: loggedInUser.name } },
      });
      await loggedInUser.updateOne({
        $push: { following: { id: userId, name: user.name } },
      });

      return res.status(200).json({
        message: `${loggedInUser.name} just followed ${user.name}`,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: `User already followed ${user.name}`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};


export const unfollow = async (req, res) => {
  try {
    const loggedInUserId = req.body.id; // sandeep id
    const userId = req.params.id; // nikita
    const loggedInUser = await User.findById(loggedInUserId); // sandeep
    const user = await User.findById(userId); // nikita

    if (loggedInUser.following.some(f => f.id.toString() === userId)) {
      await user.updateOne({
        $pull: { followers: { id: loggedInUserId } },
      });
      await loggedInUser.updateOne({
        $pull: { following: { id: userId } },
      });

      return res.status(200).json({
        message: `${loggedInUser.name} unfollowed ${user.name}`,
        success: true,
      });
    } else {
      return res.status(400).json({
        message: `User has not followed ${user.name} yet`,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: 'Server error',
    });
  }
};

// Update profile description
export const updateProfile = async (req, res) => {
  const { id, description } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      console.log('User not found for id:', id); // Log the ID for debugging
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user description
    user.description = description;
    await user.save();

    console.log(`Profile updated successfully for user: ${user.name}`); // Log success message
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error); // Log detailed error
    res.status(500).json({ message: 'Server error' });
  }
};


// Get the number of followers a user has
export const getNumberOfFollowers = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const numberOfFollowers = user.followers.length;

    return res.status(200).json({
      message: `${user.name} has ${numberOfFollowers} followers`,
      numberOfFollowers,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const searchUser = async (req, res) => {
  try {
    const { username } = req.params; // Get the username from path parameters
    console.log("LOG: " + username);
    if (!username) {
      return res.status(400).json({
        message: "Username is required",
        success: false
      });
    }

    const user = await User.findOne({ username }).select("-password");
    console.log(user);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false
      });
    }

    return res.status(200).json({
      user,
      success: true
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false
    });
  }
};
