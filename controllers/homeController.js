const { getAll, getAllOneParameter } = require('../services/workoutService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    let workouts;   
    let { search } = req.query;
    let fromInput = Number(req.query.difficultyLevel || 5);
    if(fromInput == 5) {
        workouts = await getAllOneParameter(search);
    } else {
        workouts = await getAll(search, fromInput);
    }
    for (const workout of workouts) {
        if(workout.difficultyLevel == 1) {
            workout.difficultyLevel = 'Beginner';
        } else if(workout.difficultyLevel == 2) {
            workout.difficultyLevel = 'Intermediate';
        } else if(workout.difficultyLevel == 3) {
            workout.difficultyLevel = 'Advanced';
        } else if(workout.difficultyLevel == 4){
            workout.difficultyLevel = 'Professional';
        }else {
            workout.difficultyLevel = 'All'
        }
    }
    res.render('home', {
        workouts,
        search,
        fromInput
    });
})

module.exports = router;