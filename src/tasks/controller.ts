import { Context } from "hono";
import  {getTaskById, createTaskservice,  updateTaskservice , deleteTaskservice, getProjectTasks, getUserTasks } from './service'

export const getTasks = async (c: Context) => {
    try{
        const limit = Number(c.req.query('limit'))

        const tasks = await getProjectTasks(limit);
        if (tasks == null || tasks.length == 0) {
            return c.text("Project not found", 404)
        }
        return c.json(tasks, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

export const getTask = async (c: Context) => {
    try{
        const id = Number(c.req.param('id'))

        const task = await getTaskById(id);
        if (task == null || task.length == 0) {
            return c.text("Task not found", 404)
        }
        return c.json(task, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

export const createTask = async (c: Context) => {
    try{
        const task =  await c.req.json();
        const createdTask = await createTaskservice(task);
        if (createdTask == null || createdTask.length == 0) {
            return c.text("Task not created", 404)
        }
        return c.json(createdTask, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

export const updateTask = async (c: Context) => {
    const id = parseInt(c.req.param('id')) 
    if (isNaN(id)) {
        return c.text("Invalid ID", 404)
    }
    try{
        const task =  await c.req.json();
        const updatedTask = await updateTaskservice(id, task);
        if (updatedTask == null || updatedTask.length == 0) {
            return c.text("Task not updated", 404)
        }
        return c.json(updatedTask, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

export const deleteTask = async (c: Context) => {
    const id = parseInt(c.req.param('id')) 
    if (isNaN(id)) {
        return c.text("Invalid ID", 404)
    }
    try{
        const deletedTask = await deleteTaskservice(id);
        if (deletedTask == null || deletedTask.length == 0) {
            return c.text("Task not deleted", 404)
        }
        return c.json(deletedTask, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

export const getUsersTasks = async (c: Context) => {
    const id = parseInt(c.req.param('id')) 
    if (isNaN(id)) {
        return c.text("Invalid ID", 404)
    }
    try{
        const tasks = await getUserTasks(id);
        if (tasks == null || tasks.length == 0) {
            return c.text("Tasks not found", 404)
        }
        return c.json(tasks, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

export const getTasksInProject = async (c: Context) => {
    const id = parseInt(c.req.param('id')) 
    if (isNaN(id)) {
        return c.text("Invalid ID", 404)
    }
    try{
        const tasks = await getProjectTasks(id);
        if (tasks == null || tasks.length == 0) {
            return c.text("Tasks not found", 404)
        }
        return c.json(tasks, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

