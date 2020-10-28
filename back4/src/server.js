const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
// const jwt = require('jsonwebtoken');

const homePage = require('./app/routes/index');
const userPage = require('./app/routes/users');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

require("./config/mongoose.js")(app);

app.use('/', homePage);
app.use('/repos', userPage);

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});


