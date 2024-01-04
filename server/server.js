// dontenv(환경변수) import
require('dotenv').config();

// Port 번호
const port = process.env.PORT;

// MongoDB 관련 정보
const mongodb_pw = process.env.MONGODB_PW;
const mongodb_username = process.env.MONGODB_USERNAME;
const mongodb_clusterUrl = `mongodb+srv://${mongodb_username}:${mongodb_pw}@chatphilo.fdqwv6g.mongodb.net/?retryWrites=true&w=majority`;
const mongodb_cluster = process.env.MONGODB_CLUSTER;
const mongodb_db = process.env.MONGODB_DB;

// session 관련 정보
const session_secret = process.env.SESSION_SECRET;

// Library Import
// Express import
const express = require('express');
const app = express();

// cors import
const cors = require("cors");

// Passport import
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');

// MongoDB import
const { ObjectId, MongoClient } = require('mongodb');

// mongodb-connect(세션 db 저장) import
const MongoStore = require('connect-mongo')

// bcrypt import(비밀번호 해싱)
const bcrypt = require('bcrypt')


// client-server간 통신 셋팅
app.use(cors());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// MongoDB 연결
let db;
new MongoClient(mongodb_clusterUrl).connect().then((client) => {
    console.log('DB연결성공');
    db = client.db(mongodb_db);
}).catch((err) => {
    console.log(err);
})


// Server listening
app.listen(port, () => {
    console.log(`http://localhost:${port} 에서 서버 실행중`)
})


// 메인
app.get('/', (req, res) => {
    res.send('반갑다');
})


// login 및 회원가입
// Passport library 셋팅
app.use(passport.initialize())
app.use(session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl : mongodb_clusterUrl,
        dbName: mongodb_db,
      })
}))

app.use(passport.session())

// Passport 로그인 로직
passport.use(new LocalStrategy(async (inputUsername, inputPassword, cb) => {
    let result = await db.collection('user').findOne({ username: inputUsername })
    if (!result) {
        return cb(null, false, { message: '아이디 DB에 없음' })
    }
    if (await bcrypt.compare(inputPassword, result.password)) {
        return cb(null, result)
    } else {
        return cb(null, false, { message: '비번불일치' });
    }
}))

// Passport serialize
passport.serializeUser((user, done) => {
    process.nextTick(() => {
        done(null, { id: user._id, username: user.username })
    })
})

// Passport deserialize
passport.deserializeUser(async (user, done) => {
    let result = await db.collection('user').findOne({ _id: new ObjectId(user.id) })
    delete result.password
    process.nextTick(() => {
        return done(null, user)
    })
})

// login post 요청
app.post('/login', async (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) return res.status(500).json(error)
        if (!user) return res.status(401).json(info.message)
        req.logIn(user, (err) => {
            if (err) return next(err)
            res.redirect('http://localhost:3000/')
        })
    })(req, res, next);
})

// register(회원가입) post 요청
app.post('/register', async (req, res) => {
    let hashed_pw = await bcrypt.hash(req.body.password, 10)
    await db.collection('user').insertOne({
        username: req.body.username,
        password: hashed_pw
    })
    res.redirect('http://localhost:3000/')
})