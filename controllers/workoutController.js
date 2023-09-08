const { getById, updateById, deleteById } = require("../services/workoutService");
const router = require('express').Router();
const staticWorkouts = require('../utils/staticWorkouts');

router.get('/edit/:id', async (req, res) => {
    const workoutId = req.params.id;
    let workout = await getById(workoutId);
    if(workout == null) {
        workout = staticWorkouts.filter(x => x._id == workoutId)[0];
    }
    const difficulty = workout.difficultyLevel;
    res.render('edit', {
        workout, 
        difficulty,
    });
});

router.post('/edit/:id', async (req, res) => {
    try {
        const workoutId = req.params.id;
        const result = await updateById(req.body,workoutId);
        res.redirect('/details/' + result._id);
    } catch(err) {
        req.body._id = req.params.id;
        res.render('edit', {
            workout: req.body,
            error: err.message.split('\n')
        })
    }
});

router.get('/delete/:id', async (req, res) => {
    const workoutId = req.params.id;
    let workout = await getById(workoutId);
    if(workout == null) {
        workout = staticWorkouts.filter(x => x._id == workoutId)[0];
    }
    const difficulty = workout.difficultyLevel;
    res.render('delete', {
        workout,
        difficulty,
    });
});

router.post('/delete/:id', async (req, res) => {
    const workoutId = req.params.id;
    const workout = await getById(workoutId);

    try {
        await deleteById(workoutId);
        res.redirect('/');
    } catch (err) {
        req.body._id = workoutId;
        res.render('edit', {
            workout: req.body,
            error: err.message.split('\n')
        })
    }
    res.render('delete', { workout });
});
 
module.exports = router;