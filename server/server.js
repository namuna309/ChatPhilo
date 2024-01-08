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

// crypto(인증메일 발송 관련) import
const crypto = require("crypto");

// MongoDB import
const { ObjectId, MongoClient } = require('mongodb');

// mongodb-connect(세션 db 저장) import
const MongoStore = require('connect-mongo')

// bcrypt import(비밀번호 해싱)
const bcrypt = require('bcrypt')

// NodeMailer import(이메일 인증번호 발송)
const nodemailer = require('nodemailer');


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
        mongoUrl: mongodb_clusterUrl,
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
    } 
    if (!result.isVerified) {
        return cb(null, false, { message: '이메일 인증 안함'});
    }
    else {
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

// login 요청
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


// 회원가입 이메일 중복 체크
app.post('/checkDuplicate', async (req, res) => {
    let inputUsername = req.query.username;
    let result = await db.collection('user').findOne({ username: inputUsername })
    if (result || inputUsername.length == 0) {
        res.send(true);
    }
    else {
        res.send(false);
    }
})



// 회원가입을 위한 인증 링크 이메일 발송
app.post('/send-code', async (req, res) => {
    // 인증 코드 생성
    const authkey = crypto.randomBytes(20).toString('hex');
    const expires = new Date();
    expires.setHours(parseInt(expires.getHours()) + 24);

    // 발송 이메일 주소
    let to_address = req.body.username;

    

    // Transporter 설정
    let transporter = nodemailer.createTransport({
        service: process.env.MAIL_SERVICE, // 또는 host: 'smtp.gmail.com'; port: 587;
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_AUTH_ADDRESS, // 인증 Gmail 주소
            pass: process.env.MAIL_AUTH_PW // 인증 Gmail 비밀번호 or 앱 비밀번호
        }
    })

    // 메일 발송 옵션 설정
    let mailOptions = {
        from: 'nyah309dev@gmail.com',
        to: to_address,
        subject: '인증 링크 발송',
        html: `<p> <a href="http://localhost:${process.env.PORT}/register-verify/?username=${to_address}&token=${authkey}">Verify email</a></p>
        <p>이 링크를 클릭하여 ${expires.toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })} 까지 회원 가입 인증을 해주세요.</p>`
    };

    // 메일 발송
    transporter.sendMail(mailOptions, async (err, info) => {
        if (err) {
            res.status(500).send('회원가입 중 오류가 발생했습니다.');
        } else {
            console.log('Email sent: ' + info.response);
            
            // 비밀번호 해싱
            let hashed_pw = await bcrypt.hash(req.body.password, 10)

            // 회원 정보 db 추가
            await db.collection('user').insertOne({
                username: req.body.username,
                password: hashed_pw,
                token: authkey,
                expireDate: expires,
                isVerified: false,
            })
            res.redirect('http://localhost:3000/');
        }
    });

});

// register(회원가입) get 요청
app.get('/register-verify', async (req, res) => {
    let now = new Date();
    let result = await db.collection('user').findOne({ username: req.query.username} );
    delete result.password;
    
    if (result && result.token == req.query.token && now <= result.expireDate) {
        let update_res = await db.collection('user').updateOne({ username: req.query.username }, { $set: {isVerified: true}});
        console.log('인증 성공');
        res.redirect('http://localhost:3000/');
    } else {
        if(!result) res.send('유저 정보 없음');
        else if(result.token != req.query.token) res.send('토큰이 잘못됨');
        else {
            res.send('뭔가 잘못된듯');
        }
    }
    
    
})
