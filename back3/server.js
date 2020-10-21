const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    require.json({
        message: 'Welcome'
    });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Application started on ${port}`);
});

require("./configs/mongoose.js")(app);
