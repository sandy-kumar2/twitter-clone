import React from 'react';
import Avatar from "react-avatar";
import { Link } from 'react-router-dom';

const AllFollower = ({ follower }) => {
  return (
    <div className='flex items-center justify-between my-3'>
      <div className='flex'>
        <div>
          <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
        </div>
        <div className='ml-2'>
          <h1 className='font-bold'>{follower.name}</h1>
        </div>
      </div>
      <div>
        <Link to={`/profile/${follower.id}`}>
          <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default AllFollower;
