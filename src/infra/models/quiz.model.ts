import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
    title: String,
    description: String
});

export default mongoose.model('Quiz', schema);
