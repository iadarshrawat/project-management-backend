import { Router } from 'express';
import { Types } from 'mongoose';
import { BOARD, TASK } from '../../models';

const router = Router();

router.get('/', async (req: any, res) => {
  try {
    const boards = await BOARD.find();
    if (!boards) {
      res.status(500);
      throw new Error('No boards found.');
    }
    res.status(200)
    .json({
      success: true,
      message: 'Board fetched successfully.',
      boards
    });
  } catch (error: any) {
    console.error('Error fetching board:', error);
  }
});

router.post('/', async (req: any, res) => {
  try {
    const { type, title } = req.body;

    if (!type || !title) {
      res.status(400);
      throw new Error('Both "type" and "title" are required.');
    }

    const board = await BOARD.create({ type, title });
    if (!board) {
      res.status(500);
      throw new Error('Failed to create board.');
    }
    res.status(201)
    .json({
      success: true,
      message: 'Board created successfully.',
      board
    });
  } catch (error: any) {
    console.error('Error creating board:', error);
  }
});

router.post('/:id/tasks', async (req: any, res) => {
  try {
    const boardId = req.params.id;
    const { title, description, status, priority, dueDate } = req.body;
    console.log('Request Body:', req.body);
    console.log(title, description, status, priority, dueDate);
    if (!title || !description || !status || !priority || !dueDate) {
      return res.status(400)
      .json({
        message:
          '"title", "description", "status", "priority", and "dueDate" are required'
      });
    }

    const boardExists = await BOARD.findById(boardId);
    if (!boardExists) {
      return res.status(404)
      .json({ message: 'Board not found' });
    }

    const task = await TASK.create({
      title,
      description,
      status,
      priority,
      dueDate,
      _boardId: boardId
    });

    res.status(201)
    .json(task);
  } catch (error) {
    console.error('Error creating board:', error);
  }
});

router.get('/:id/tasks', async (req: any, res) => {
  try {
  const boardId = req.params.id;

  if (!Types.ObjectId.isValid(boardId)) {
      return res.status(400)
      .json({ message: 'Invalid board id' });
    }

  const boardExists = await BOARD.exists({ _id: boardId });
  if (!boardExists) {
      return res.status(404)
      .json({ message: 'Board not found' });
    }

 
  const tasks = await TASK.find({ _boardId: boardId })
      .sort({ createdAt: -1 })
      .lean();

  res.status(200)
  .json({ tasks });
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
});

export const boardController = router;
