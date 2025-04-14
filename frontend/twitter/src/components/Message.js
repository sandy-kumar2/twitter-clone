import React, { useEffect, useRef } from 'react';
import { useSelector } from "react-redux";
import Avatar from 'react-avatar';

const Message = ({ message }) => {
  const scroll = useRef();
  const { user } = useSelector(store => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={scroll} className={`chat flex items-start gap-2 mb-4 ${message?.senderId === user?._id ? 'chat-start' : 'chat-end'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="38" round={true} />
        </div>
      </div>
      <div>
        <div className={`chat-bubble ${message?.senderId === user?._id ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'} p-2 rounded-lg`}>
          {message?.message}
        </div>
      </div>
    </div>
  );
}

export default Message;
