import  db  from '../drizzle/db';
import { sql} from 'drizzle-orm';
import {  users, TSUser, TIUser } from "../drizzle/schema";
import { hash } from 'bcrypt';

export const loginAuthService = async (user:TSUser ) => {
  const { username } = user;
  try {
    const foundUser = await db.query.users.findFirst({
      columns: {
        user_id: true,
        username: true,
        password: true,
        email: true,
        image_url: true,
        role: true,
      },
      where: sql` ${users.username} = ${username}`
    });
    console.log('Found user:', foundUser);

    if (!foundUser) {
        throw new Error('User not found');
      }

    return foundUser;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw new Error('User login failed');
  }
};

export const authenticationService = async (user: TIUser) => {
  try {
    // Log received user data for debugging
    console.log('Registering user:', user);

    const hashedPassword = await hash(user.password, 10);

    // Insert user into `users` table
    const createdUser = await db.insert(users).values({
      username: user.username,
      email: user.email,
      password: hashedPassword,
      image_url: user.image_url || null,
      role: user.role || 'user',
      date_joined: sql`now()`,
      updated_at: sql`now()`
    }).returning();

    console.log('User created in users table:', createdUser); // Log created user data

    return createdUser[0]; // Return the created user
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('User creation failed');
  }
};