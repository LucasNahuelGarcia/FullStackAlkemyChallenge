module.exports = function (app,pool) {

    app.get('/api/getTransactions', (req, res) => {
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
    
    app.post('/api/addTransaction', (req, res) => {
        pool.query("insert into transactions(title, amount, session_id) values(?, ?, ?)",
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