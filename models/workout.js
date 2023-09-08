const { Schema, model, Types } = require('mongoose');

const workoutSchema = new Schema({
    name: { type: String, required: true},
    description: { type: String, required: true},
    imageUrl: { type: String, required: true},
    difficultyLevel: { type: Number, required: true, min: 1, max: 4 },
    owner: {type: Types.ObjectId, ref: 'User', required: true}
});

const workout = model('Workout', workoutSchema);

module.exports = workout;