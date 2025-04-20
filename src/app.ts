import express, { Request, Response } from "express";
import tasksRouter from "./routes/tasks";

const app = express();

app.use(express.json());

app.use('/api/tasks', tasksRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Task manager API is running!');
});

export default app;