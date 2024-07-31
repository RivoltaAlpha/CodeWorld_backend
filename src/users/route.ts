import { Hono, Context } from "hono";
import { getUser,createUser,updateUser,deleteUser,listUsers } from "./controller";
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validator";


export const userRouter = new Hono();

userRouter.get('/users', listUsers);
userRouter.get('/user/:id', getUser);

userRouter.post("/user", zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser);

userRouter.put('/user/:id', zValidator(  'json', userSchema), updateUser);

userRouter.delete('/user/:id', deleteUser)