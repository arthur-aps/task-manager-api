import { Router } from "express";
import { createTask, listTasks, getTaskById, updateTask, deleteTask } from "../controllers/tasks";

const tasksRouter = Router();

tasksRouter.post('/', createTask);
tasksRouter.get('/', listTasks);
tasksRouter.get('/:id', getTaskById);
tasksRouter.put('/:id', updateTask);
tasksRouter.delete('/:id', deleteTask);

export default tasksRouter;