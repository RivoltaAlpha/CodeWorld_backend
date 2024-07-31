import { getProjectById, getAllUserProjects, getProjectLogs,getAllProjects, getProjectTasks, getProjectsByStatus, createProject, updateProject, deleteProject } from "./services"
import { Context } from "hono"


export const getProjects = async (c: Context) => {
    try {  
        const limit = Number(c.req.query('limit'))
  
        const projects = await getAllProjects(limit);
        if (projects == null || projects.length == 0) {
            return c.text("User not found", 404)
        }
        return c.json(projects, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getProject = async (c: Context) => {
    try {  
        const id = Number(c.req.param('id'))
  
        const project = await getProjectById(id);
        if (project == null || project.length == 0) {
            return c.text("Project not found", 404)
        }
        return c.json(project, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const CreatingProject = async (c: Context) => {
    try {

        const project =  await c.req.json();
        const createdProject = await createProject(project);
        if (createdProject == null || createdProject.length == 0) {
            return c.text("Project not created", 404)
        }
        return c.json(createdProject, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}
// use perseInt instead of Number incase an error occurs
export const UpdatingProject = async (c: Context) => {
    const id = parseInt(c.req.param('id'))
    if (isNaN(id)) {
        return c.text("Invalid ID", 404)
    }
    try {
        const project =  await c.req.json();
        const updatedProject = await updateProject(id, project);

        if (updatedProject == null || updatedProject.length == 0) {
            return c.text("Project not updated", 404)
        }
        return c.json(updatedProject, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const DeletingProject = async (c: Context) => {
    try {
        const id = Number(c.req.param('id'))
        const deletedProject = await deleteProject(id);
        if (deletedProject == null || deletedProject.length == 0) {
            return c.text("Project not deleted", 404)
        }
        return c.json(deletedProject, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getUserProjects = async (c: Context) => {
    try {  
        const userId = Number(c.req.param('userId'))
  
        const projects = await getAllUserProjects(userId);
        if (projects == null || projects.length == 0) {
            return c.text("User not found", 404)
        }
        return c.json(projects, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getProjectsTasks = async (c: Context) => {
    try{
        const id = Number(c.req.param('id'))

        const tasks = await getProjectTasks(id);
        if (tasks == null || tasks.length == 0) {
            return c.text("Project not found", 404)
        }
        return c.json(tasks, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getTheProjectLogs = async (c: Context) => {
     try{
        const id = Number(c.req.param('id'))

        const logs = await getProjectLogs(id);
        if (logs == null || logs.length == 0) {
            return c.text("Project not found", 404)
        }
        return c.json(logs, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}