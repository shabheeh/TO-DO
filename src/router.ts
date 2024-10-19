import { Router } from "express";
import { createTask, updateTask, markCompleted, markPending, getTasks, deleteTask } from './controllers/taskController';


const router: Router = Router();



// Routes
router.get('/tasks', getTasks);

router.post('/tasks', createTask);

router.put('/tasks/:id',  updateTask);

router.patch('/tasks/:id/completed', markCompleted);

router.patch('/tasks/:id/pending', markPending);

router.delete('/tasks/:id', deleteTask)

export default router;
