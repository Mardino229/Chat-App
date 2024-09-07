// src/controllers/chatController.ts
const Message = require('../model/Message');

 const getChatHistory = async (sender, receiver) => {
    return Message.find({
        $or: [
            {sender, receiver},
            {sender: receiver, receiver: sender},
        ],
    }).sort('timestamp')
};

 const saveMessage = async (messageData) => {
    const message = new Message(messageData);
    await message.save();
    return message;
};

 module.exports = {getChatHistory, saveMessage}
