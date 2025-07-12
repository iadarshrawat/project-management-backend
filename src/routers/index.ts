import { Router } from 'express';
import { boardController } from '../controllers/boardController';
import { taskController } from '../controllers/taskController';

const router = Router();

router.use('/boards', boardController);
router.use('/tasks', taskController);

export { router };
