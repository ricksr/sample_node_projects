const router = require('express').Router();

const productController = require('../controller');

router.post('/', productController.gitRepos);

module.exports = router;