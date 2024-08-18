import { Hono, Context } from 'hono';
import { getTask, getTasks, getUsersTasks, getTasksInProject, createTask, updateTask, deleteTask} from './controller'


export const taskRouter = new Hono();


taskRouter.get('/tasks', getTasks);
taskRouter.get('/task/:id', getTask);
taskRouter.get('/tasks-project/:id', getTasksInProject);
taskRouter.get('/user-tasks/:id', getUsersTasks);
taskRouter.post('/create-task', createTask);
taskRouter.put('/update-task/:id', updateTask);
taskRouter.delete('/delete-task/:id', deleteTask)