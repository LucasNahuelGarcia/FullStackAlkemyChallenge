const express = require('express');
const morgan = require('morgan');
const db = require('mariadb');
const session = require('express-session');
const mariadb = require('mariadb');
const MariaDBStore = require('express-session-mariadb-store');
const app = express();

const port = process.env.PORT || 3000;
 const pool = mariadb.createPool({ host: process.env.DB_HOST, user: process.env.DB_USER, connectionLimit: 5 });

app.use(morgan('tiny'));

app.get('/api/balance', (req, res) => {
    res.json({
        balance: 0
    });
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});