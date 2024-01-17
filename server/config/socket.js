const express = require('express');
const router = express.Router();
const { getDB } = require('./database');
const ObjectId = require('mongodb').ObjectId;
const config = require('../config');
const OpenAI  = require("openai"); 


const openai = new OpenAI({
    apiKey: config.openai_api_key,
    organization: config.openai_organization_id
  });

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

        socket.on('send_message', async (data) => {
            console.log('유저가 보낸거 : ', data.content)
            try {
                const db = getDB();

                // user가 보낸 메세지 DB에 저장
                let sendMessage = await db.collection('chatMessages').insertOne({
                    room_id: new ObjectId(data.room_id),
                    type: data.type,
                    counselor: data.counselor,
                    content: data.content,
                    date: data.date,
                })
                console.log('user 메세지 저장됨', sendMessage);

                // open ai 메세지 생성
                const response = await openai.chat.completions.create({
                    messages: [{ role: "user", content: data.content }],
                    model: "gpt-3.5-turbo",
                  });
                // counselor가 보낸 메세지 DB에 저장
                let counselorMessage = {
                    room_id: new ObjectId(data.room_id),
                    type: 'counselor',
                    counselor: data.counselor,
                    content: response.choices[0].message.content,
                    date: new Date()
                }
                let replyMessage = await db.collection('chatMessages').insertOne(counselorMessage) 
                console.log('counselor 메세지 저장됨', replyMessage);

                // counselor 메세지 전송
                io.to(data.room_id).emit(`braodcast-${data.room_id}`, counselorMessage);
            }
            catch(err) {
                console.log(err)
                // counselor 메세지 전송
                io.to(data.room_id).emit(`braodcast-${data.room_id}`, err);
            }
        })
    })

    return io;
};

module.exports = setupSocket;