const mongoose = require("mongoose");

const uri = process.env.ATLAS_URI;

const app = () => {
    mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    });

    const connection = mongoose.connection;
    connection.once('open', () => {
        console.log('MongoDB database connection established successfully ! ');
    })

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);

};
const cleanup = () => {
    mongoose.connection.close(() => {
        process.exit(0);
    });
}

module.exports = app;