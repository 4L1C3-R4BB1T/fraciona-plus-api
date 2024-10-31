import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
    title: String,
    description: String,
    image: String,
    color: String
}, { timestamps: true });

export default mongoose.model('achievements', schema);
