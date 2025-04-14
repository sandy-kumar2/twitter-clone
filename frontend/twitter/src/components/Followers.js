import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import AllFollower from './AllFollower';
import AllFollowing from './AllFollowing';

const Followers = () => {
  const { user } = useSelector((store) => store.user);
  const [selectedTab, setSelectedTab] = useState('followers');

  return (
    <div className="w-full">
      <div className="flex items-center justify-evenly border-b border-gray-200">
        <div
          className={`cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 ${
            selectedTab === 'followers' ? 'border-b-4 border-blue-600' : ''
          }`}
          onClick={() => setSelectedTab('followers')}
        >
          <h1 className="font-bold text-gray-600 text-lg">Followers</h1>
          <p>{user?.followers?.length}</p>
        </div>
        <div
          className={`cursor-pointer hover:bg-gray-200 w-full text-center px-4 py-3 ${
            selectedTab === 'following' ? 'border-b-4 border-blue-600' : ''
          }`}
          onClick={() => setSelectedTab('following')}
        >
          <h1 className="font-semibold text-gray-600 text-lg">Following</h1>
          <p>{user?.following?.length}</p>
        </div>
      </div>
      <div>
        {selectedTab === 'followers' &&
          user?.followers?.map((follower) => (
            <AllFollower key={follower._id} follower={follower} />
          ))
        }
        {selectedTab === 'following' &&
          user.following.map((followings) => (
            <AllFollowing key={followings._id} following={followings} />
          ))
        }
      </div>
    </div>
  );
};

export default Followers;
