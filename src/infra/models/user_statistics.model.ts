import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
    userId: String,
    correctAnswers: Number,
    wrongAnswers: Number,
    challengesCompleted: Number,
    qttAchievements: Number,
    totalExp: Number
}, { timestamps: true });

export default mongoose.model('user_statistics', schema);
