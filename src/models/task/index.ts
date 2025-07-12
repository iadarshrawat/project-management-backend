import mongoose from 'mongoose';

const task = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    _boardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
    status: { type: String, required: true, enum: ['TO_DO', 'IN_PROGRESS', 'DONE'] },
    priority: { type: String, required: true, enum: ['LOW', 'MEDIUM', 'HIGH'] },
    dueDate: { type: Date, required: true }
}, {timestamps: true });

export const TASK = mongoose.model('Task', task);
