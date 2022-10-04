const env = require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('mariadb');
const session = require('express-session');
const mariadb = require('mariadb');
const MariaDBStore = require('express-session-mariadb-store');
const uuid = require('uuid');
const path = require('path');
const app = express();

const options = {
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB
}

const port = process.env.PORT || 3000;
const pool = mariadb.createPool(options);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(morgan('tiny'));
app.use(session({
    store: new MariaDBStore({
        pool: pool,
    }),
    saveUninitialized: true,
    resave: false,
    secret: uuid.v4(),
}))

app.post('/api/addTransaction', (req, res) => {
    console.log(req.body);
    pool.query("insert into transactions(title, amount, session_id) values(?, ?, ?)", [
        req.body.title,
        req.body.amount,
        req.sessionID
    ]).then((queryResults) => {
        res.sendStatus(200);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});