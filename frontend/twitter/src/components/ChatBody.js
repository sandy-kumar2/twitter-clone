import React from 'react';
import ChatInput from './ChatInput';
import Messages from './Messages';
import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import useGetProfile from '../hooks/useGetProfile';

const ChatBody = ({ onClose }) => {
  const {selectedUser} = useSelector(store => store.user);

  const { id } = useParams();

  useGetProfile(id);

  return (
    <>
      {selectedUser !== null ? (
        <div className='md:min-w-[550px] flex flex-col'>
          <div className='flex gap-2 items-center bg-zinc-500 text-white px-4 py-2 mb-2'>
            <div className='flex items-center gap-2'>
              <div className='border-2 border-white rounded-full'>
                <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"size="48" round={true} />
              </div>
              <div className='flex flex-col flex-1'>
                <div className='flex justify-between gap-2'>
                  <p>{selectedUser?.name}</p>
                </div>
              </div>
            </div>
          </div>
          <Messages/>
          <ChatInput onClose={onClose} />
        </div>
      ) : (
          <div className='md:min-w-[550px] flex flex-col justify-center items-center'>
            <h1 className='text-4xl text-white font-bold'>Hi</h1>
            <h1 className='text-2xl text-white'>Let's start conversation</h1>
          </div>
        )
      }
    </>
  );
};

export default ChatBody;
