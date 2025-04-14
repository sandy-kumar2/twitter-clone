import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTweets } from '../redux/tweetSlice';
import { TWEET_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import Tweet from './Tweet';

const TweetsList = () => {
    const dispatch = useDispatch();
    const { tweets, refresh } = useSelector(state => state.tweet);

    const fetchTweets = async () => {
        try {
            const res = await axios.get(`${TWEET_API_END_POINT}/tweets`, { withCredentials: true });
            dispatch(getAllTweets(res.data.tweets));
        } catch (error) {
            console.error('Error fetching tweets:', error);
        }
    };

    useEffect(() => {
        fetchTweets();
    }, [refresh]); // Fetch tweets when refresh state changes

    return (
        <div>
            {tweets && tweets.map(tweet => (
                <Tweet key={tweet._id} tweet={tweet} />
            ))}
        </div>
    );
};

export default TweetsList;
