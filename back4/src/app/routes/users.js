const router = require('express').Router();
const redis = require('redis');

const productController = require('../controller');
const SetResponse = require('../helpers/SetResponse');

const REDIS_PORT = process.env.PORT || 6379;
const client = redis.createClient(REDIS_PORT);



const useCache = async (req, res, next) => {
    try {
        const { username } = req.params;
        client.get(username, (err, data) => {
            if (data !== null) {
                res.status(200).send(SetResponse.setResponse(username, data));
            } else {
                next();
            }
        });
    }
    catch (err) {
        res.status(500).json({
            Error: err,
            status: false,
        })
    }
};

router.get('/:username', useCache, productController.gitRepos);

module.exports = router;