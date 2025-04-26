import mongoose from 'mongoose'

// try after removing new as well like whats the diff
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
},

    { timestamps: true }

)

const Message = mongoose.model("message", messageSchema);

export default Message;