const express = require('express');
const router = express.Router();
const { getDB } = require('../config/database');

// 채팅방 개설 및 탐색 관련 라우트
router.get('/c/request', async (req, res) => {
    const db = getDB();
    let csl = req.query.csl;
    let chat = await db.collection('chatRooms').findOne({ user_id: req.user._id, counselor: csl });
    console.log(chat);
    if (!chat) {
        let result = await db.collection('chatRooms').insertOne({
            user_id: req.user._id,
            username: req.user.username,
            counselor: csl
        });
        console.log(result);
        return res.status(200).send(result.insertedId);
    } else {
        
        return res.status(200).send(chat._id);
    }
});

router.get('/c', async (req, res) => {
    let rid = req.query.rid;
    return res.status(200).send(rid);
});

module.exports = router;