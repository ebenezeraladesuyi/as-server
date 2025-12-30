import mongoose, { Schema } from 'mongoose';

const likeSchema = new Schema({
    blogId: { type: Schema.Types.ObjectId, ref: 'Blog', required: true },
    userIdentifier: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now }
});

export const likeModel = mongoose.model('Like', likeSchema);