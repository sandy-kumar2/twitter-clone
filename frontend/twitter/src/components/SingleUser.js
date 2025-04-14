import React from 'react';
import Avatar from "react-avatar";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const SingleUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);

  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));
  }

  return (
    <div className='flex'>
      <div 
        onClick={selectedUserHandler} 
        className={` ${selectedUser?._id} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}
      >
        <Avatar src={user.avatar || "https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg"} size="40" round={true} />
        <div className='ml-2'>
          <h1 className='font-bold'>{user?.name}</h1>
          <p className='text-sm'>{`@${user?.username}`}</p>
        </div>
        <div>
          <Link to={`/profile/${user?._id}`}>
            <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleUser;
