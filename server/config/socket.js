const { Server } = require('socket.io');

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"]
        }
    });

    // socket
    io.on('connection', (socket) => {
        console.log(`websocket 연결됨: ${socket.id}`);

        socket.on('ask-join', (room) => {
            socket.join(room);
            console.log(room, '과 join 되었습니다.')
        })

        socket.on('send_message', (data) => {
            console.log('유저가 보낸거 : ', data)
            io.to(data.rid).emit(`braodcast-${data.rid}`, data);
        })
    })

    return io;
};

module.exports = setupSocket;