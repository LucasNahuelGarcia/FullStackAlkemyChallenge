module.exports = function (app, pool) {
    app.get('/api/transactions', (req, res) => {
        pool.query("SELECT title,amount FROM transactions WHERE session_id = ?;",
            [
                req.sessionID
            ]).then((queryResults) => {
                res.json(queryResults);
            }).catch((err) => {
                console.log(err);
                res.sendStatus(500);
            });
    });

    app.post('/api/transactions', (req, res) => {
        pool.query("INSERT INTO transactions(title, amount, session_id) VALUES(?, ?, ?)",
            [
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
}