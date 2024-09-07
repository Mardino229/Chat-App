const http = require('http');
const app = require('./app');
const {Server} = require("socket.io");
const chat = require("./sockets/chatSocket");


const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const server = http.createServer(app);
const io = new Server(server,
    {
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Authorization'],
            credentials: true,
        },});
chat.chatSocket(io);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);
