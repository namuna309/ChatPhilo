const express = require('express');
const router = express.Router();
const { getDB } = require('../config/database');

// 채팅방 개설 및 탐색 관련 라우트
router.get('/c/request', async (req, res) => {
    const db = getDB();
    let csl = req.query.csl;
    let chat = await db.collection('chatRooms').findOne({ user_id: req.user._id, counselor: csl });
    
    let date = new Date();
    if (!chat) {
        let new_chatroom = await db.collection('chatRooms').insertOne({
            user_id: req.user._id,
            username: req.user.username,
            counselor: csl
        });
        let new_chatmessage = await db.collection('chatMessages').insertOne({
            room_id: new_chatroom.insertedId,
            type: 'counselor',
            counselor: csl,
            content: `어서오세요! ${csl}입니다!`,
            date: date
        })
        console.log(new_chatroom);
        console.log(new_chatmessage);
        return res.status(200).send([{
            room_id: new_chatroom.insertedId,
            type: 'counselor',
            counselor: csl,
            content: `어서오세요! ${csl}입니다!`,
            date: date
        }]);
    } else {
        let chatMessages = await db.collection('chatMessages').find({room_id: chat._id}).toArray();
        console.log(chatMessages)
        return res.status(200).send(chatMessages);
    }
});

router.get('/c', async (req, res) => {
    let rid = req.query.rid;
    return res.status(200).send(rid);
});

module.exports = router;