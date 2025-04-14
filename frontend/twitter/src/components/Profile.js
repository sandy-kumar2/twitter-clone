import React, { useState } from 'react';
import { IoMdArrowBack } from 'react-icons/io';
import { Link, useParams } from 'react-router-dom';
import Avatar from 'react-avatar';
import { useDispatch, useSelector } from 'react-redux';
import useGetProfile from '../hooks/useGetProfile';
import axios from 'axios';
import { USER_API_END_POINT } from '../utils/constant';
import toast from 'react-hot-toast';
import { followingUpdate } from '../redux/userSlice';
import { getRefresh } from '../redux/tweetSlice';
import ChatBody from './ChatBody';

const Profile = () => {
    const { user, profile } = useSelector(store => store.user);
    const { id } = useParams();

    useGetProfile(id);
    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [newText, setNewText] = useState(profile?.description);
    const [showMessageModal, setShowMessageModal] = useState(false); // State for showing message modal

    const followAndUnfollowHandler = async () => {
        if (user.following.includes(id)) {
            // Unfollow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id: user?._id });
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        } else {
            // Follow
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: user?._id });
                dispatch(followingUpdate(id));
                dispatch(getRefresh());
                toast.success(res.data.message);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
    };

    const handleTextChange = (e) => {
        setNewText(e.target.value);
    };

    const handleSave = async () => {
        try {
            const res = await axios.post(`${USER_API_END_POINT}/updateProfile`, {
                id: user?._id,
                description: newText,
            });
            toast.success(res.data.message);
            setIsEditing(false);
        } catch (error) {
            toast.error('Failed to update profile');
            console.log('Error updating profile:', error);
            console.log('Error response data:', error.response?.data);
        }
    };

    const closeEditBox = () => {
        setIsEditing(false);
    }

    const handleOpenMessageModal = () => {
        setShowMessageModal(true);
    };

    const handleCloseMessageModal = () => {
        setShowMessageModal(false);
    };

    return (
        <div className='w-[50%] border-l border-r border-gray-200'>
            <div>
                <div className='flex items-center px-4 py-2'>
                    <Link to="/" className='p-2 rounded-full hover:bg-gray-100 hover:cursor-pointer'>
                        <IoMdArrowBack size="24px" />
                    </Link>
                    <div>
                        <h1 className='font-bold text-lg'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm'>8 post</p>
                    </div>
                </div>
                <img src="https://pbs.twimg.com/profile_banners/1581707412922200067/1693248932/1080x360" alt="banner" />
                <div className='absolute top-52 ml-2 border-4 border-white rounded-full'>
                    <Avatar src="https://pbs.twimg.com/profile_images/1703261403237502976/W0SFbJVS_400x400.jpg" size="120" round={true} />
                </div>
                <div className='text-right m-4'>
                    {
                        profile?._id === user?._id ? (
                            <button className='px-4 py-1 hover:bg-gray-300 rounded-full border border-gray-400' onClick={() => setIsEditing(true)}>Edit Profile</button>
                        ) : (
                            <>
                                <button onClick={followAndUnfollowHandler} className='px-4 py-1 bg-black text-white rounded-full'>{user.following.includes(id) ? "Following" : "Follow"}</button>
                                <button className='ml-4 px-4 py-1 bg-blue-500 text-white rounded-full mt-2' onClick={handleOpenMessageModal}>Message</button>
                            </>
                        )
                    }
                </div>
                <div className='m-4'>
                    <h1 className='font-bold text-xl'>{profile?.name}</h1>
                    <p>{`@${profile?.username}`}</p>
                </div>

                <div className='m-4 text-sm'>
                    {isEditing ? (
                        <div>
                            <textarea
                                value={newText}
                                onChange={handleTextChange}
                                className='w-full border border-gray-300 p-2 rounded-md'
                            />
                            <button onClick={handleSave} className='mt-2 px-4 py-1 bg-black text-white rounded-full mr-2'>Save</button>
                            <button onClick={closeEditBox} className='mt-2 px-4 py-1 bg-black text-white rounded-full'>Close</button>
                        </div>
                    ) : (
                        <p>{profile?.description || 'Add Bio'}</p> 
                    )}
                </div>

                {/* Message Modal */}
                {showMessageModal && (
                    <div className='fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center'>
                        <div className='bg-white p-4 rounded-lg'>
                            {/* Modal content */}
                            <h2 className='text-lg font-bold mb-4'>Send a Message</h2>
                            <ChatBody onClose={handleCloseMessageModal} /> {/* Pass the onClose prop to Message component */}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
