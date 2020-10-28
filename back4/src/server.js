const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const redis = require('redis');

// const jwt = require('jsonwebtoken');

const homePage = require('./app/routes/index');
const userPage = require('./app/routes/users');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);

console.log(client);

app.use(cors());
app.use(bodyParser.json());

// require("./config/mongoose.js")(app);

app.use('/', homePage);
app.use('/repos/:username', userPage);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});


