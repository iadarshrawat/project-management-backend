import mongoose from 'mongoose';

const board = new mongoose.Schema({
  type: { type: String, required: true, enum: ['FRONTEND', 'MARKETING'] },
  title: { type: String, required: true }
}, {timestamps: true });

export const BOARD = mongoose.model('Board', board);
