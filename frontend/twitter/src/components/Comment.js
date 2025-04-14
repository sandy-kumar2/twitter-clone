import React from 'react';
import { format } from 'date-fns';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { TWEET_API_END_POINT } from '../utils/constant';
import axios from "axios";
import {useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { getRefresh } from '../redux/tweetSlice';

const Comment = ({ comment, user, tweet }) => {
  const formattedDate = format(new Date(comment.createdAt), 'MMMM dd, yyyy h:mm a');
  const dispatch = useDispatch();

  const handleCommentDelete = async (tweetId, commentId, e) => {
    // e.preventDefault();
    try {
      const res = await axios.delete(
        `${TWEET_API_END_POINT}/deletecomment/${tweetId}/${commentId}`,
        { withCredentials: true }
      );
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="p-3 bg-[#F2F2F2] rounded-md mt-2 border border-gray-200">
      <div className="flex justify-between">
        <h1 className="text-sm font-medium">{comment?.name}</h1>
        <p className="text-sm text-gray-500">{formattedDate}</p>
      </div>
      <div className="mt-2">
        <p>{comment.text}</p>
      </div>
      {comment.userId === user?._id && (
        <div className="flex justify-end mt-2" style={{ marginTop: '-18px' }}>
          <MdOutlineDeleteOutline
            onClick={() => handleCommentDelete(tweet._id, comment._id)}
            size="24px"
            className="cursor-pointer text-red-500 hover:text-red-600"
          />
        </div>
      )}
    </div>
  );
};

export default Comment;
