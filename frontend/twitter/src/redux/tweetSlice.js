import {createSlice} from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name:"tweet",
    initialState:{
        tweets: null,
        refresh: false,
        isActive: true
    },
    reducers: {
        getAllTweets: (state, action) => {
            state.tweets = action.payload;
        },
        getRefresh: (state, action) => {
            state.refresh = action.payload;
        },
        getIsActive: (state, action) => {
            state.isActive = action.payload;
        }
    }
});

export const {getAllTweets, getRefresh, getIsActive} = tweetSlice.actions;
export default tweetSlice.reducer;