const { response } = require('express');
const fetch = require('node-fetch');
const redis = require('redis');

const REDIS_PORT = process.env.PORT || 6379;

const client = redis.createClient(REDIS_PORT);

const setResponse = (username, repos) => {
    return `<h2>${username} has ${repos} Github Repos</h2>`
}

exports.gitRepos = async (req, res, next) => {
    try {
        console.log('Fetching data ... ');
        console.log(req);
        const { username } = req.params;
        const response = await fetch(`https://api.github.com/users/${username}`);
        const data = await response.json();
        const repos = data.public_repos;

        // redis < Key, Value > pair
        client.setex(username, 3600, repos);

        if (typeof data !== undefined)
            res.status(200).send(setResponse(username, repos));
        else
            res.status(400).json('Error' + 'username not valid');
    }
    catch (err) {
        res.status(500).json({
            error: err || 'Network error',
            status: true,
        });
    }
};
