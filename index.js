const express = require('express');
const morgan = require('morgan');
const app = express();
const port = 3000;

app.use(morgan('tiny'));

app.get('/', (req, res) => {
    res.send('Alkemy Challenge');
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
