import React from 'react'
import Avatar from 'react-avatar';
import { useParams } from 'react-router-dom';
import useGetProfile from '../hooks/useGetProfile';
import { useSelector } from 'react-redux';

const ChatHeader = () => {
    const { profile } = useSelector(store => store.user);
    const { id } = useParams();

    useGetProfile(id);
 
    return (
        <div className='w-full flex items-center justify-between p-4'>
            <div className='flex items-center gap-4'>
                <div className='flex items-center gap-2'>
                    <div className='border-2 border-white rounded-full'>
                        <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="48" round={true} />
                    </div>
                    <h1 className='font-bold text-lg'>{profile?.name}</h1>
                </div>
            </div>
        </div>
    )
}

export default ChatHeader;
