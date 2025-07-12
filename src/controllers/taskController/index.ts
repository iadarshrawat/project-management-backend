import { Router } from 'express';
import { BOARD, TASK } from '../../models';

const router = Router();

router.put('/:id', async (req: any, res) => {
  try {
     const { id } = req.params;
     const { title, description, status, priority, dueDate, _taskId } = req.body;
     const boardExists = await BOARD.findById(id);
     console.log('Board Exists:', req.body);
     if (!boardExists) {
      return res.status(404)
      .json({ message: 'Board not found' });
    }

     const update: Partial<Record<keyof typeof req.body, any>> = {};
     if (title) { update.title = title; }
     if (description) { update.description = description; }
     if (status) { update.status = status; }
     if (priority) { update.priority = priority; }
     if (dueDate) { update.dueDate = dueDate; }

     console.log('Update Object:', _taskId);
     console.log('Update Object:', id);
     const task = await TASK.findOneAndUpdate(
      { _id: _taskId, _boardId: id },
      update,
      { new: true, runValidators: true }
    );

     if (!task) {
      return res.status(404)
      .json({ message: 'Task not found for this board' });
    }

     res.status(200)
     .json({
        success: true,
        message: 'Task updated successfully.',
        task
    });
  } catch (error) {
    console.error('Error creating board:', error);
  }
});

router.delete('/:id', async (req: any, res) => {
  try {
    const { id } = req.params;

    const task = await TASK.findOneAndDelete(
      { _id: id}
    );

    res.status(200)
    .json({
        success: true,
        message: 'Task delete successfully.'
    });
  } catch (error) {
    console.error('Error creating board:', error);
  }
});

export const taskController = router;
