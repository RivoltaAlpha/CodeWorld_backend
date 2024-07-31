import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import {TIUser,TSUser,users,} from "../drizzle/schema";

export const usersService = async (
  limit?: number
): Promise<TSUser[] | null> => {
  if (limit) {
    return await db.query.users.findMany({
      limit: limit,
    });
  }
  return await db.query.users.findMany();
};

export async function getUserById(id: number): Promise<Array<TSUser>> {
  return db.select().from(users).where(eq(users.user_id, id));
}

export async function createUserService(data: TIUser) {
  await db.insert(users).values(data);
  return "User created successfully";
}

export async function updateUserService(id: number, user: TIUser) {
  await db.update(users).set(user).where(eq(users.user_id, id));
  return "User updated successfully";
}

export async function deleteUserService(id: number) {
  await db.delete(users).where(eq(users.user_id, id));
  return "User deleted successfully";
}