const env = require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const db = require('mariadb');
const session = require('express-session');
const mariadb = require('mariadb');
const MariaDBStore = require('express-session-mariadb-store');
const uuid = require('uuid');
const app = express();

const options ={
    connectionLimit: 10,
    password: process.env.DB_PASS,
    user: process.env.DB_USER,
    database: process.env.MYSQL_DB,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    createDatabaseTable: true
}

const port = process.env.PORT || 3000;
const pool = mariadb.createPool(options);

app.use(morgan('tiny'));
app.use(session({
    store: new MariaDBStore({
        pool: pool,
    }),
    saveUninitialized: true,
    resave: false,
    secret: uuid.v4(),
}))

app.get('/api/balance', (req, res) => {
    res.json({
        db: process.env.MYSQL_DB,
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});