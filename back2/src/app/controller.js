let User = require('./models/user.model');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        const username = req.body.username;
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address;
        const password = req.body.password;
        const reEnteredPassword = req.body.repeatedPassword;

        if (password === reEnteredPassword) {

            const newUser = new User({
                username,
                email,
                name,
                address,
                password
            });
            await newUser.save()
                .then(() => res.status(200).json('success'))
                .catch((err) => res.status(400).json('Error : ' + err));
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err || 'Network Error',
            status: false,
        });
    };
};

exports.login = async (req, res) => {

    try {
        const username = req.body.username;
        const password = req.body.password;

        let userObjectId;
        // check if username is present or not 
        await User.find({ username: username })
            .then(user => {
                console.log(user);
                // userObjectId = user[0].get(_id);
                console.log(userObjectId);
                User.findById(user[0]._id)
                    .then(userInfo => {
                        console.log(userInfo);
                        if (userInfo.password === password) {

                            jwt.sign({ username }, 'secretkey', (err, token) => {
                                token ? res.status(200).json({ 'token': token })
                                    : res.status(400).json('Error : ' + err)
                                // console.log('\n'+token+'\n');
                            })
                        }
                    })
                    .catch((err) => res.status(400).json('Error : ' + err));
            })
            .catch(err => res.status(400).json('Error : ' + err));
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err || 'Network Error',
            status: false,
        });
    };
};

exports.createBlogPost = async (req, res) => {
    try {
        if (req.length !== 2)
            res.status(400).json('Error : ' + 'Auth. Failed')

        jwt.verify(req[1].token, 'secretkey', (err, authData) => {
            res.status(200).json({
                message: 'loggedin user verified',
                status: true
            });
        });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            error: err || 'Network Error',
            status: false,
        });
    };
};

