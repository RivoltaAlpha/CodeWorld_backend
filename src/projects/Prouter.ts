import { Hono, Context } from "hono";
import { CreatingProject, UpdatingProject, DeletingProject, getProject,getProjects,getUserProjects, getProjectsTasks, getTheProjectLogs, } from "./controller"
// import { zValidator } from "@hono/zod-validator";
// import { userSchema } from "../validator";
// import { authenticateAdmin, authenticateBoth } from "../middleware/auth";


export const projectRouter = new Hono();


projectRouter.get('/projects', getProjects);
projectRouter.get('/projects/:id', getProject);
projectRouter.get('/projects-tasks/:id', async(c: Context) => getProjectsTasks (c));
projectRouter.get('/projects-logs/:id', async(c: Context) => getTheProjectLogs (c));
projectRouter.get('/user-projects/:user_id', async (c: Context) => getUserProjects(c));
projectRouter.post('/project', async(c: Context) => CreatingProject (c));
projectRouter.put('/projects/:id', async(c: Context) => UpdatingProject(c));
projectRouter.delete('/projects/:id', async(c: Context) => DeletingProject(c))