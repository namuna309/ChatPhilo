const express = require('express');
const router = express.Router();
const { getDB } = require('../config/database');
const ObjectId = require('mongodb').ObjectId;
const config = require('../config');
const OpenAI = require("openai");


const openai = new OpenAI({
    apiKey: config.openai_api_key,
    organization: config.openai_organization_id
});

// 채팅방 개설 및 탐색 관련 라우트
router.get('/c/request', async (req, res) => {
    const db = getDB();
    let csl = req.query.csl;
    let chat = await db.collection('chatRooms').findOne({ user_id: new ObjectId(req.user._id), counselor: csl });

    let date = new Date();
    if (!chat) {
        const thread = await openai.beta.threads.create();
        let new_chatroom = await db.collection('chatRooms').insertOne({
            user_id: new ObjectId(req.user._id),
            username: req.user.username,
            counselor: csl,
            thread_id: thread.id
        });
        console.log('대화방 개설 완료', `chatroom: ${new_chatroom.insertedId}, thread: ${thread.id}`);
        console.log(new_chatroom);
        return res.status(200).send({
            thread_id: thread.id,
            counselor: chat.counselor,
        });
    } else {
        return res.status(200).send({
            thread_id: chat.thread_id,
            counselor: csl,
        });
    }
});

router.get('/c/msglist', async (req, res) => {
    const thread_id = req.query.tId;
    console.log('thread_id: ', thread_id);

    try {
        const threadMessages = await openai.beta.threads.messages.list(
            thread_id
          );
         
          console.log(threadMessages.data);

          return res.status(200).send(threadMessages.data.reverse())
    } catch (err) {
        console.log(err);
        return res.status(400).send(err);
    }
})

router.get('/c', async (req, res) => {
    let rid = req.query.rid;
    return res.status(200).send(rid);
});

const verifingRunStatus = async (run_id,thread_id) => {
    const run = await openai.beta.threads.runs.retrieve(
        thread_id,
        run_id
    );
    return run.status;
}

router.post('/c/createMsg', async (req, res) => {
    console.log('작성한 메세지: ',req.body.content);
    const createdMessages = await openai.beta.threads.messages.create(
        req.query.tId,
        { role: "user", content: req.body.content }
    );
    console.log('메세지 생성', createdMessages);
    return res.status(200).send(createdMessages)
})

router.get('/c/getResp', async (req, res) => {
    try {
        // 메세지 발송(run)
        const run = await openai.beta.threads.runs.create(
            req.query.tId,
            { assistant_id: config.openai_assistant_id_schopenhauer }
        );

        // 메세지 발송(run) 확인
        let limit = 1;
        while (limit <= 60) {
            let status = await verifingRunStatus(run.id, req.query.tId,).then((res) => {return res});
            console.log(status);
            if (status === 'completed') break;
            else {
                limit++;
                await delay(1000);
                console.log('메세지 생성중', limit, '초')
            }
        }

        const reply = await openai.beta.threads.messages.list(
            req.query.tId
        );

        return res.status(200).send(reply.data[0]);
    }
    catch (err) {
        console.log(err);
        return res.status(400).send(err)
    }

});



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

router.get('/c/getMsgList', async (req, res) => {
    const threadMessages = await openai.beta.threads.messages.list(
        'thread_baIGZSJEeMNcCajIKhRJc867'
    );

    return res.status(200).send(threadMessages);

})

router.get('/c/delThread', async (req, res) => {
    const delThread = await openai.beta.threads.del('thread_tTL3TCZNx4RhZkjFRnAl0lwg');
    const newThread = await openai.beta.threads.create();
    return res.status(200).send(newThread.id);
})
module.exports = router;