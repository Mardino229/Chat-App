const jwt = require("jsonwebtoken");
const chatController = require("../controller/chatController");

const chatSocket = (io) => {

    io.use((socket, next) => {
        socket.on('error', (err) => {
            console.error('Socket encountered error: ', err);
            socket.disconnect();
        });
        const token = socket.handshake.auth.token;
        if (!token) {
            return next(new Error('Authentication error'));
        }

        try {
            socket.user = jwt.verify(token, process.env.JWT_SECRET);
            next();
        } catch (err) {
            next(new Error('Authentication error'));
        }
    });

    io.on('connection', (socket) => {
        console.log('User connected: ', socket.id);

        socket.on('getChatHistory', async ({ receiver }) => {
            const history = await chatController.getChatHistory(socket.user.userId, receiver);
            socket.emit('chatHistory', history);
        });

        socket.on('sendMessage', async (messageData) => {
            const message = await chatController.saveMessage({
                sender: messageData.sender,
                receiver: messageData.receiver,
                content: messageData.content,
            });
            io.emit('receiveMessage', message);
        });

        socket.on('disconnect', () => {
            console.log('User disconnected');
        });
    });
};

module.exports = {chatSocket};
