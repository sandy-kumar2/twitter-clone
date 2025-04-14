import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';
import { MESSAGE_API_END_POINT } from '../utils/constant';

const ChatInput = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!selectedUser || !selectedUser._id) {
      console.error("Selected user ID is not valid.");
      return;
    }
    try {
      const res = await axios.post(`${MESSAGE_API_END_POINT}/send/${selectedUser._id}`, { message }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.status === 201) {
        dispatch(setMessages([...messages, res.data.newMessage]));
      } else {
        console.error('Error sending message:', res.data.error);
      }
    } catch (error) {
      console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
    setMessage("");
  };

  return (
    <div className='flex flex-col'>
      <div className='flex justify-between items-center gap-2'>
        <form className='w-full' onSubmit={onSubmitHandler}>
          <div className='flex items-center gap-4'>
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className='rounded-full w-full border border-gray-400 p-2 outline-none font-medium'
              type="text"
              placeholder="Type your message..."
            />
            <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-full' type='submit'>Send</button>
            <button 
              className='mt-4 px-4 py-2 bg-red-500 text-white rounded-full'
              onClick={onClose}
              type='button'>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatInput;
