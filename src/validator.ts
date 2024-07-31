import { z } from 'zod';

export const userSchema = z.object({
    user_name: z.string(),
    email: z.string().email(),
    password: z.string(),
    image_url: z.string(),
});