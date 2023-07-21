const express = require('express');
const router = require('../router/test.routes');
const userRouter = require('../router/user.routes');
const morgan = require('morgan');
const app = express();

app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('Apicreatic');
})

app.use(express.json());
app.use("/api/v1/", userRouter);
app.use("/api/v1/", router);



module.exports = app;
