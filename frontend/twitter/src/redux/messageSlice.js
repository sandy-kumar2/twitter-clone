import {createSlice} from "@reduxjs/toolkit";

// messageSlice.js or reducer file
const initialState = {
  messages: [], // Initialize messages as an empty array
  loading: false,
  error: null,
};

// Handle action to set messages in reducer
const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    // Handle other actions like loading or error states
  },
});

export const {setMessages} = messageSlice.actions;
export default messageSlice.reducer;