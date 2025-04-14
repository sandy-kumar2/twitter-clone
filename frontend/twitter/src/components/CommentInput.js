import React, { useState } from 'react';
import axios from 'axios';
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';

const CommentInput = ({ tweet }) => {
  const { user } = useSelector((store) => store.user);
  const [commentText, setCommentText] = useState('');
  const dispatch = useDispatch();
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  const handleCommentSubmit = async (id, e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const res = await axios.post(
        `${TWEET_API_END_POINT}/comment/${id}`,
        {
          text: commentText,
          userId: user?._id, // Assuming user._id is the correct field for user ID
        },
        { withCredentials: true }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
      setCommentText('');
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => handleCommentSubmit(tweet?._id, e)}
        className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <textarea
            placeholder="Write your comment here..."
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
            className="border border-gray-300 rounded-md p-2"/>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => setShowCommentDialog(!showCommentDialog)}
              type="submit"
              className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600">
              Submit
            </button>
            <button
              onClick={() => setShowCommentDialog(false)}
              className="bg-gray-300 text-gray-800 rounded-md px-4 py-2 hover:bg-gray-400">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
