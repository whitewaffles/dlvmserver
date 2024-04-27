const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// 정적 파일 제공
app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
    console.log('a user connected');

    // 클라이언트가 그림을 그리면 모든 클라이언트에게 전파
    socket.on('drawing', (data) => {
        socket.broadcast.emit('drawing', data);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});