import { getReceiverSocketId, io } from "../SocketIO/server.js";
import Conversation from "../models/conversationmodel.js";
import Message from "../models/messagemodel.js";
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id; // current logged in user
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, receiverId] },
        });
        if (!conversation) {
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            });
            // check what this create is doing 
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });
        if (newMessage) {
            conversation.messages.push(newMessage._id);
        }
        // await conversation.save()
        // await newMessage.save();
        await Promise.all([conversation.save(), newMessage.save()]); // run parallel
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessage", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getMessage = async (req, res) => {
    try {
        const { id: chatUser } = req.params;
        const senderId = req.user._id; // current logged in user
        let conversation = await Conversation.findOne({
            members: { $all: [senderId, chatUser] },
        }).populate("messages");    //(populate)- avoids N+1 Query Problem: Gets all related messages in one query

        // Finds a conversation between two specific users

        // members: { $all: [senderId, chatUser] } means:

        // The members array field must contain both IDs

        // Order doesn't matter (could be [A,B] or [B,A])
        if (!conversation) {
            return res.status(201).json([]);
        }
        const messages = conversation.messages;
        res.status(201).json(messages);
    } catch (error) {
        console.log("Error in getMessage", error);
        res.status(500).json({ error: "Internal server error" });
    }
};