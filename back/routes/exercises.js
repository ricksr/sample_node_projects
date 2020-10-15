const router = require('express').Router();
let Exercise = require('../models/exercise.model');

// refer to routes/users.js for refs.
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({
        username,
        description,
        duration,
        date,
    });
    newExercise.save()
        .then(() => res.json('Exercises added !'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:username').post((req, res) => {
    Exercise.find({ username: req.params.username })
        .then(nameId => {
            // console.log(exercise);
            const id = nameId[0].get('_id', '');
            Exercise.findById(id)
                .then(exercise => {
                    exercise.username = req.body.username;
                    exercise.description = req.body.description;
                    exercise.duration = Number(req.body.duration);
                    exercise.date = Date.parse(req.body.date);
                    console.log(exercise);
                    exercise.save()
                        .then(() => res.json('Exercise updated!'))
                        .catch((err) => res.status(400).json('Error: ' + err));
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;