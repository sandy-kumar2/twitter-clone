import React, { useState } from 'react';
import Avatar from "react-avatar";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import axios from "axios";
import { TWEET_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { getRefresh } from '../redux/tweetSlice';
import { timeSince } from "../utils/constant";
import CommentInput from './CommentInput';
import Comments from './Comments';

const Tweet = ({ tweet }) => {
  const { user } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const [showCommentDialog, setShowCommentDialog] = useState(false);

  const likeOrDislikeHandler = async (id) => {
    try {
      const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
        withCredentials: true
      });
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  const deleteTweetHandler = async (id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  const bookmarkHandler = async (id) => {
    try {
      const res = await axios.put(`${TWEET_API_END_POINT}/bookmark/${id}`, { id: user?._id }, {
        withCredentials: true
      });
      dispatch(getRefresh());
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  }

  return (
    <div className='border-b border-gray-200'>
      <div className='text-sm mx-2 p-2 flex items-center justify-between border-b border-gray-300'>
        {
          <p onClick={() => setShowCommentDialog(!showCommentDialog)} className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'></p>
        }
      </div>
      <div>
        <div className='flex p-4'>
          <Avatar src={tweet?.userDetails[0]?.avatar || "https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"} size="40" round={true} />
          <div className='ml-2 w-full'>
            <div className='flex items-center'>
              <h1 className='font-bold'>{tweet?.userDetails?.name}</h1>
              <p className='text-gray-500 text-sm ml-1'>{`@${tweet?.userDetails?.username} . ${timeSince(tweet?.createdAt)}`}</p>
            </div>
            <div>
              <p>{tweet?.description}</p>
            </div>
            
            <div className='flex justify-between my-3'>
              <div className='flex items-center'>
                <div onClick={() => likeOrDislikeHandler(tweet?._id)} className='p-2 hover:bg-pink-200 rounded-full cursor-pointer'>
                  <CiHeart/>
                </div>
                <p>{tweet?.like?.length}</p>
              </div>
                  
              <div className='flex items-center'>
                <div onClick={() => setShowCommentDialog(!showCommentDialog)} className='p-2 hover:bg-green-200 rounded-full cursor-pointer'>
                  <FaRegComment/>
                </div>
                <p>{tweet?.comments?.length}</p>
              </div>

              <div onClick={() => bookmarkHandler(tweet?._id)} className='flex items-center'>
                <div className='p-2 hover:bg-yellow-200 rounded-full cursor-pointer'>
                  <CiBookmark/>
                </div>
                <p>{tweet?.bookmarks?.length}</p>
              </div>

              {
                user?._id === tweet?.userId && (
                  <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                    <div className='p-2 hover:bg-red-300 rounded-full cursor-pointer'>
                      <MdOutlineDeleteOutline size="24px" />
                    </div>
                  </div>
                )
              }
            </div>
          </div>
        </div>
      </div>
      {showCommentDialog && (
        <div className='p-4'>
          <CommentInput tweet={tweet}/>
          <Comments tweet={tweet}/>
        </div>
      )}
    </div>
  )
}

export default Tweet;
