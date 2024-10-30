import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
    userId: String,
    achievementId: String,
}, { timestamps: true, });

export default mongoose.model('user_achievement', schema);
