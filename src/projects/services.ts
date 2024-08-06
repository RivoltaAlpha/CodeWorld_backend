import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TProject, TProjectSelect, projects } from "../drizzle/schema";

export const getAllProjects = async ( limit: number) : Promise<TProject[] | null> => {
    if (limit > 0) {
        const projects = await db.query.projects.findMany({
            limit: limit
        });
        return projects
    }
    const projects = await db.query.projects.findMany();
    return projects
}


export const getProjectById = async (id: number) : Promise<Array<TProjectSelect>> => {
    const project = await db.select().from(projects).where(eq(projects.projects_id, id));
    return project
}

export async function createProject(project: TProject) {
    const createdProject = await db.insert(projects).values(project).returning();
    console.log('createdProject', createdProject)
    return createdProject
  }

export async function updateProject(id: number, project: TProject) {
    const updatedProject = await db .update(projects).set(project).where(eq(projects.projects_id, id)).returning();
    console.log('updatedProject', updatedProject)
    return updatedProject
  }

export async function deleteProject(id: number) {
    const deletedProject = await db .delete(projects).where(eq(projects.projects_id, id)).returning();
    console.log('deletedProject', deletedProject)
    return deletedProject
  }


export async function getAllUserProjects(userId: number){
    return await db.query.projects.findMany({
        where: (fields, {eq}) => eq(fields.user_id, userId),
        columns: {
            projects_id: true,
            user_id: true,
            project_name: true,
            description: true,
            githubRepo: true,
            start_date: true,
            end_date: true,
            project_status: true
        },
        with: {
            users: {
                columns: {
                    username: true,
                    user_id: true,
                    image_url: true,
                    email: true
                }
            },
            workLogs: {
                columns: {
                    id: true,
                    task_id: true,
                    user_id: true,
                    log_date: true,
                    time_spent: true
                }
            },
            tasks: {
                columns: {
                    task_id: true,
                    project_id: true,
                    task_name: true,
                    description: true,
                    due_date: true,
                    completed: true
                }
            }
        }
    })
}

const field = {
    status: {
        enumValues: ['todo', 'doing', 'done']
    }
};
export const getProjectsByStatus = async (status: string) : Promise<TProject[]> => {
    const selectedStatus = field.status.enumValues.find((value) => value === status);

    if (selectedStatus === undefined) {
        throw new Error(`Invalid status: ${status}`);
    }

    const projects = await db.query.projects.findMany({
        where: (fields, {eq}) => eq(fields.project_status, selectedStatus as any),
    });
    return projects
}

export const getProjectTasks = async (project_id: number) : Promise<TProject[]> => {
    const projects = await db.query.projects.findMany({
        where: (fields, {eq}) => eq(fields.projects_id, project_id),
        with: {
            tasks: {
                columns: {
                    task_id: true,
                    project_id: true,
                    task_name: true,
                    description: true,
                    due_date: true,
                    completed: true
                }
            }
        }
    });
    return projects
}

export const getProjectLogs = async (project_id: number) => {
    const projects = await db.query.projects.findMany({
        where: (fields, {eq}) => eq(fields.projects_id, project_id),
        with: {
            workLogs: {
                columns: {
                    id: true,
                    task_id: true,
                    user_id: true,
                    log_date: true,
                    time_spent: true
                }
            }
        }
    });
    return projects
}