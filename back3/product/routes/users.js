const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');

router.post('/register', (req, res) => {

    const username = req.body.username;
    const name = req.body.name;
    const email = req.body.email;
    const address = req.body.address;
    const password = req.body.password;
    const reEnteredPassword = req.body.repeatedPassword;

    if (password === reEnteredPassword) {
        const newUser = new User({ username, email, name, address, password });
        newUser.save()
            .then(() => res.status(200).json([{ 'Success': 'User added' }]))
            .catch((err) => res.status(400).json('Error : ' + err));
    } else {
        res.status(400).json('Error : ' + 'Password mismatch')
    }
    res.status(400).json('Error : ' + 'Fill details properly')

});

router.post('/login', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    let usernameCheck = 0;
    let userObjectId;
    // check if username is present or not 
    User.find({ username: username })
        .then(user => {
            if (user.length >= 5) {
                userObjectId = user[0].get('_id', '');
                usernameCheck = 1;
            }
        })
        .catch(() => res.status(400).json('Error : ' + err));
    // if username is valid , check if password is valid or not
    if (usernameCheck === 1) {
        User.findById({ userObjectId })
            .then(userInfo => {
                if (userInfo.password === password) {

                    jwt.sign({ username }, 'secretkey', (err, token) => {
                        token ? res.status(200).json([{ 'Success': true }, { 'token': token }])
                            : res.status(400).json('Error : ' + err)
                        // console.log('\n'+token+'\n');
                    })
                }
            })
            .catch(err => res.status(400).json('Error : ' + err));
    }
    res.status(400).json('Error : ' + 'Login not Successfull')
});

router.post('/posts', verifyToken, (req, res) => {
    if (req.length !== 2) res.status(400).json('Error : ' + 'Auth. Failed')
    jwt.verify(req[1].token, 'secretkey', (err, authData) => {
        err ? res.status(403).json('Error : ' + 'Auth. Failed') :
            res.status(200).json([{ 'Success': 'loggedin user verified' }])
    })
});

const verifyToken = async (req, res, next) => {
    const brearerHeader = req.headers['authorization'];
    if (typeof brearerHeader !== 'undefined') {
        const bearer = brearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        let response = await next();
        // console.log('\n' + response + '\n');
    } else {
        res.status(403).json('Error : ' + 'Auth. Failed, access Forbidden')
    }
};

module.exports = router;