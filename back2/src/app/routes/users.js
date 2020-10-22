const router = require('express').Router();
let User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { exists } = require('../models/user.model');
const productController = require('../controller');

const verifyToken = async (req, res, next) => {
    try {
        console.log(req);
        const brearerHeader = req.headers['authorization'];
        if (typeof brearerHeader !== 'undefined') {
            const bearer = brearerHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            let response = await next();
            console.log('\n' + response + '\n');
        } else {
            res.status(403).json('Error : ' + 'Auth. Failed, access Forbidden')
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

router.post('/register', productController.register);
router.post('/login', productController.login);
router.post('/posts', verifyToken, productController.createBlogPost)

module.exports = router;