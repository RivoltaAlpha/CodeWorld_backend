import { z } from 'zod';

export const userSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    image_url: z.string(),
    role: z.string()
});

export const loginUserShema = z.object({
    username: z.string(),
    password: z.string(),
});

export const registerUserShema = z.object({
    username: z.string(),
    email: z.string(),
    password: z.string(),
    role: z.string().optional(),
});