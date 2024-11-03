import mongoose, { Schema } from 'mongoose';

const alternativeSchema = new Schema({
    id: Number,
    label: String
});

const trailItemSchema = new Schema({
    id: Number,
    type: String,
    item: String,
    content: String,
    image: String,
    correctId: Number,
    alternatives: [alternativeSchema],
    title: String,
    description: String,
    disabled: Boolean,
    completed: Boolean
});

const unitSchema = new Schema({
    id: Number,
    title: String,
    items: [trailItemSchema] 
});

const schema = new Schema({
    id: Number,
    divider: String,
    units: [unitSchema]
});

export default mongoose.model('sections', schema);
