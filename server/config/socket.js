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
        })

        socket.on('send', (data) => {
            console.log('유저가 보낸거 : ', data)
            io.to(data.rid).emit(`braodcast-${data.rid}`, '답장');
        })
    })

    return io;
};

module.exports = setupSocket;