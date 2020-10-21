const mongoose = require("mongoose");
const uri = process.env.ATLAS_URI;

module.exports = app => {
    mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useFindAndModify: false
    })
        .then(res => console.log("connected"))
        .catch(err => console.log(err));

    mongoose.Promise = global.Promise;

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);
    process.on("SIGHUP", cleanup);

    if (app) {
        app.set("mongoose", mongoose);
    }
    console.log('\n' + 'down' + '\n');
};

const cleanup = async () => {
    await mongoose.connection.close(() => {
        process.exit(0);
    });
}