import React from 'react';
import { CiSearch } from "react-icons/ci";
import Search from './Search';
import SingleUser from './SingleUser';

const RightSidebar = ({ otherUsers }) => {
  return (
    <div className='w-[25%] p-4'>
      <div className='flex items-center p-2 bg-gray-100 rounded-full outline-none'>
        <CiSearch size="20px" />
        <Search/>
      </div>
      <div className='p-4 bg-gray-100 rounded-2xl my-4'>
        <h1 className='font-bold text-lg'>Who To Follow</h1>
        {otherUsers?.map((user) => (
          <SingleUser key={user._id} user={user}/>
        ))}
      </div>
    </div>
  );
}

export default RightSidebar;
