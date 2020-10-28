const router = require('express').Router();
let User = require('../models/user.model');

const productController = require('../controller');

router.post('/:username', productController.gitRepos);

// router.post('/register', productController.register);
// router.post('/login', productController.login);
// router.post('/posts', verifyToken, productController.createBlogPost)

module.exports = router;