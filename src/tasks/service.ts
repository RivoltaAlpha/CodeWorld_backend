import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { TSTask, TITask, tasks } from "../drizzle/schema";

export async function getTaskById(id: number): Promise<Array<TSTask>> {
  return db.select().from(tasks).where(eq(tasks.task_id, id));
}

export async function createTaskservice(data: TITask) {
  await db.insert(tasks).values(data);
  return "task created successfully";
}

export async function updateTaskservice(id: number, task: TITask) {
  await db.update(tasks).set(task).where(eq(tasks.task_id, id));
  return "task updated successfully";
}

export async function deleteTaskservice(id: number) {
  await db.delete(tasks).where(eq(tasks.task_id, id));
  return "task deleted successfully";
}

export async function getProjectsTasks(id: number): Promise<Array<TSTask>> {
  return db.select().from(tasks).where(eq(tasks.project_id, id));
}

export async function getUserTasks(id: number): Promise<Array<TSTask>> {
  return db.select().from(tasks).where(eq(tasks.user_id, id));
}

// export async function getTasks( id: number): Promise<Array<TSTask>> {
//   return db.query.tasks.findMany({ where: {users_id: eq(id), project_id: eq(id) } });
// }


