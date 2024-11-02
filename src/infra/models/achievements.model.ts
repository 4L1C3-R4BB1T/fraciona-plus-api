import mongoose, { Schema } from 'mongoose';

export const ACHIEVEMENT_TOKEN = 'achievement';

export type Achievement = {
    title: string;
    description: string;
    image: string;
    color: string;
    type: 'trial-period' | 'consecutive-days' | 'ranking' | 'challenge' | 'learning' | 'no-wrong' | 'no-error';
    goal: number;
}

const schema = new Schema<Achievement>({
    title: String,
    description: String,
    image: String,
    color: String,
    goal: Number,
    type: {
        required: true,
        enum: ['trial-period', 'consecutive-days', 'ranking', 'challenge', 'learning', 'no-wrong', 'no-error'],
        type: String,
    }
}, { timestamps: true });

export default mongoose.model('achievements', schema);
