const express = require("express");
const session = require('express-session')
const knexSessionStore = require('connect-session-knex')(session);
const helmet = require("helmet");
const cors = require("cors");

const server = express()

const sessionConfig = {
    name: 'anyNameforSession',
    secret: 'shh',
    cookie: {
        maxAge: 60000, //Milliseconds
        secure: false, // should be true in production
        httpOnly: true //only for Http use
    },
    resave: false,
    saveUninitialized: false,

    store: new knexSessionStore(
        {
            knex: require('../data/dbConfig.js'),
            tablename: "sessions",
            sidfieldname: "sid",
            createtable: true,
            clearInterval: 60000
        }
    )
};

const userRouter = require("../users/user-router.js");
const authRouter = require("../auth/auth-routher.js");

server.use(helmet());
server.use(express.json());
server.use(cors());
//Use Session
server.use(session(sessionConfig));

server.use('/api/users', userRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
    res.send('Server is Running...');
});

module.exports = server;