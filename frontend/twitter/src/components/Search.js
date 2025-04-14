import React, { useState } from 'react';
import axios from 'axios';
import Avatar from "react-avatar";
import { Link } from 'react-router-dom';
import { USER_API_END_POINT } from '../utils/constant';

const SearchUser = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`${USER_API_END_POINT}/search/${searchTerm}`,
            { withCredentials: true });
            setUser(response.data.user);
            setError('');
        } catch (err) {
            setUser(null);
            setError('User not found');
            console.log(err)
        }
    };

    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='w-full'>
            <div className='flex items-center w-full'>
                <input
                    type="text"
                    className='bg-transparent outline-none px-2 w-full'
                    placeholder='Search'
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                />
            </div>
            {user && (
                <div className='flex items-center justify-between my-3'>
                    <div className='flex'>
                        <div>
                          <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="40" round={true} />
                        </div>
                        <div className='ml-2'>
                           <h1 className='font-bold'>{user.name}</h1>
                        </div>
                    </div>
                    <div>
                        <Link to={`/profile/${user.id}`}>
                           <button className='px-4 py-1 bg-black text-white rounded-full'>Profile</button>
                        </Link>
                    </div>
                </div>
            )}
            <div>
                {error}
            </div>
        </div>
    );
};

export default SearchUser;
