const express = require('express');
const router = require('../router/test.routes');
const morgan = require('morgan');
const app = express();

app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('expresssss');
})

app.use(express.json());
app.use("/api/v0", router);

module.exports = app;
