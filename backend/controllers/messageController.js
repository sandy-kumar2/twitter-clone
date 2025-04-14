import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.user; // This should be set by isAuthenticated middleware
        const receiverId = req.params.id;
        const { message } = req.body;

        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        }

        await Promise.all([gotConversation.save(), newMessage.save()]);

        return res.status(201).json({
            newMessage
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.user; // This should be set by isAuthenticated middleware

        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        if (!conversation) {
            return res.status(404).json({ message: "Conversation not found" });
        }

        // Ensure conversation exists and has messages
        if (!conversation.messages || conversation.messages.length === 0) {
            return res.status(200).json({ messages: [] }); // Return an empty array if no messages found
        }

        return res.status(200).json(conversation.messages);
    } catch (error) {
        console.error("Error fetching messages:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

