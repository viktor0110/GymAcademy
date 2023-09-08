const { getById } = require('../services/workoutService');
const staticWorkouts = require('../utils/staticWorkouts');

const router = require('express').Router();

router.get('/:id', async (req, res) => {
    const workoutId = req.params.id;
    
    let workout = await getById(workoutId);

    let isOwner;

    if(workout == null) {
        workout = staticWorkouts.filter(x => x._id == workoutId)[0];
    }
    
    if(workout) {
        if(req.user){
            isOwner = req.user._id == workout.owner
        }

        if(workout.difficultyLevel == 1) {
            workout.difficultyLevel = 'Beginner';
        } else if(workout.difficultyLevel == 2) {
            workout.difficultyLevel = 'Intermediate';
        } else if(workout.difficultyLevel == 3) {
            workout.difficultyLevel = 'Advanced';
        } else{
            workout.difficultyLevel = 'Professional';
        }

        res.render('details', {
            workout,
            isOwner
        });
    } else {
        res.render('404');
    }
    
})

module.exports = router;