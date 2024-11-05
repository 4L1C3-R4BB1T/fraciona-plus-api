import mongoose, { Schema } from 'mongoose';

const alternativeSchema = new Schema({
    id: Number,
    label: String
});

const questionSchema = new Schema({
    type: String,
    content: String,
    image: String,
    correctId: Number,
    alternatives: [alternativeSchema],
    correctQtt: Number,
    label: String
});

const schema = new Schema({
    title: String,
    difficulty: Number,
    image: String,
    questions: [questionSchema]
}, { timestamps: true });

export default mongoose.model('challenges', schema);
