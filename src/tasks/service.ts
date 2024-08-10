// import db from "../drizzle/db";
// import { eq } from "drizzle-orm";
// import { TSTask, TITask, tasks, WorkLogs } from "../drizzle/schema";

// export async function getTaskById(id: number): Promise<Array<TSTask>> {
//   return db.select().from(tasks).where(eq(tasks.task_id, id));
// }

// export async function createTaskservice(data: TITask) {
//   await db.insert(tasks).values(data);
//   return "task created successfully";
// }

// export async function updateTaskservice(id: number, task: TITask) {
//   await db.update(tasks).set(task).where(eq(tasks.task_id, id));
//   return "task updated successfully";
// }

// export async function deleteTaskservice(id: number) {
//   await db.delete(tasks).where(eq(tasks.task_id, id));
//   return "task deleted successfully";
// }

// export async function getProjectsTasks(id: number): Promise<Array<TSTask>> {
//   return db.select().from(tasks).where(eq(tasks.project_id, id));
// }

// export async function getUserTasks(id: number): Promise<Array<TSTask>> {
//   return db.select().from(tasks).where(eq(tasks.user_id, id));
// }

// // export async function getTasks( id: number): Promise<Array<TSTask>> {
// //   return db.query.tasks.findMany({ where: {users_id: eq(id), project_id: eq(id) } });
// // }


// export async function updateTaskStatus(task_id, newStatus) {
//   const task = await db.tasks.findById(task_id);

//   let updateData = {
//     status: newStatus,
//     updated_at: new Date(),
//   };

//   if (newStatus === 'inProgress') {
//     updateData.start_time = new Date();
//   } else if (newStatus === 'completed') {
//     updateData.end_time = new Date();
//   }

//   await db.tasks.update(task_id, updateData);

//   // Automatically create a work log entry
//   if (newStatus === 'inProgress' || newStatus === 'completed') {
//     const logEntry = {
//       project_id: task.project_id,
//       user_id: task.user_id,
//       log_date: new Date(),
//       time_spent: newStatus === 'completed' ? (new Date() - task.start_time) : 0,
//       description: `Task status changed to ${newStatus}`,
//       created_at: new Date(),
//       updated_at: new Date(),
//     };
//     await db.work_logs.insert(logEntry);
//   }
// }
