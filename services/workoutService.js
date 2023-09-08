const Workout = require('../models/workout');

function getAll(search = '', fromInput) {
    const difficultyLevel = Number(fromInput) || 1;
    
    return Workout.find({name: { $regex: new RegExp(search, 'i') }})
    .where('difficultyLevel').eq(difficultyLevel).lean();  
};

function getAllOneParameter(search = '') {
    return Workout.find({name: { $regex: new RegExp(search, 'i') }}).lean();
}

function getById(id) {
    return Workout.findById(id).lean();
};

async function createWorkout(workoutData, ownerId) {
    const workout = {
        name: workoutData.name,
        description: workoutData.description,
        imageUrl: workoutData.imageUrl,
        difficultyLevel: Number(workoutData.difficultyLevel),
        owner: ownerId
    };

    const missing = Object.entries(workout).filter(([k,v]) => !v);

    if(missing.length > 0) {
        throw new Error(missing.map(m => `${m[0]} is required!`).join('\n'));
    }

    const result = await Workout.create(workout);
    return result;
};

async function updateById(workoutData, workoutId){
    const workout = await Workout.findById(workoutId);

    const missing = Object.entries(workoutData).filter(([k, v]) => !v);
    if (missing.length > 0) {
        throw new Error(missing.map(([k, v]) => `${k} is required!`).join('\n'))
    }

    workout.name = workoutData.name;
    workout.imageUrl = workoutData.imageUrl;
    workout.description = workoutData.description;
    workout.difficultyLevel = workoutData.difficultyLevel

    await workout.save();
    return workout;
};

async function deleteById(workoutId) {
    return Workout.findByIdAndRemove(workoutId);
};

module.exports = {
    getAll,
    getAllOneParameter,
    getById,
    createWorkout,
    updateById,
    deleteById,
}