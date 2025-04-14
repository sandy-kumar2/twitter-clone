import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from "react-redux";

const Messages = () => {
    useGetMessages();

    const { messages } = useSelector(store => store.message);
    
    // Handle empty messages or loading state
    if (!messages || messages.length === 0) {
        return (
            <div className="px-4 flex-1 overflow-auto">
                <p>No messages yet.</p>
            </div>
        );
    }
    
    return (
        <div className="px-4 flex-1 overflow-auto">
            {messages.map((message) => (
                <Message key={message._id} message={message} />
            ))}
        </div>
    );
}

export default Messages;
