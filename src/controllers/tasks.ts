import { Request, Response } from 'express';
import { Task } from '../models/Task';
import { v4 as uuidv4 } from 'uuid';

let tasks: Task[] = [];

function getTaskIndex(idToFind: string): number {
  return tasks.findIndex(task => task.id === idToFind);
}

function notFoundById(taskId: string, response: Response) {
  response.status(404).json({ error: `Task with ID ${taskId} not found!` })
}

export const createTask = (req: Request<Task>, res: Response) => {
  const { title, description } = req.body;
  
  if (!title) {
    res.status(400).json({ error: "Title is required" });
  }
  
  const newTask: Task = {
    id: uuidv4(),
    title,
    description: description || "",
    done: false,
    createdAt: new Date()
  };
  
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const listTasks = (req: Request,res: Response) => {
  res.status(200).json(tasks);
};

export const getTaskById = (req: Request<Task>, res: Response) => {
  const id = req.body.id;
  console.log(id);
  const task = tasks.find(task => task.id === id);
  
  if (!task) {
    notFoundById(id, res);
  }
  
  res.status(200).json(task);
};

export const updateTask = (req: Request<Task>, res: Response) => {
  const { id, title, description, done } = req.body;
  
  const i = getTaskIndex(id);
  
  if (i === -1) {
   notFoundById(id, res);
  }

  const updatedTask: Task = {
    ...tasks[i],
    title: title !== "" ? title : tasks[i].title,
    description: description !== "" ? description : tasks[i].description,
    done: done !== "" ? done : tasks[i].done
  };
  
  tasks[i] = updatedTask;
  res.status(200).json(updatedTask);
};

export const deleteTask = (req: Request<Task>, res: Response) => {
  const id = req.params.id;
  const i = getTaskIndex(id);
  
  if (i === -1) {
    notFoundById(id, res);
  }
  
  tasks.splice(i, 1);
  res.status(200).json({ message: `Task with ID ${id} deleted successfully` });
};