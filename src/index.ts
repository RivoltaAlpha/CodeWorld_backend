import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from "hono/logger";
import { csrf } from "hono/csrf";
import {cors} from 'hono/cors'
import { trimTrailingSlash } from "hono/trailing-slash";
import { timeout } from "hono/timeout";
import { HTTPException } from "hono/http-exception";
import "dotenv/config"
import { projectRouter } from './projects/Prouter'
import { userRouter } from './users/route';
import { authRouter } from './authentication/routing'; 
import { taskRouter } from './tasks/routing';
import { categoryRouter } from './categories/route'; 

const app = new Hono()
// inbuilt middlewares
app.use(logger()); //logs request and response to the console
app.use(csrf()); //prevents CSRF attacks by checking request headers.
app.use(trimTrailingSlash()); //removes trailing slashes from the request URL
app.use(cors()) //allows cross-origin requests

const customTimeoutException = () =>
  new HTTPException(408, {
    message: `Request timeout after waiting for more than 10 seconds`,
  });
app.use("/", timeout(100000, customTimeoutException));
//3rd party middlewares
// app.use("*", registerMetrics);

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.notFound((c) => {
  return c.text("Route Not Found", 404);
});

app.onError((err, c) => {
  console.error(err);
  return c.text("Internal Server Error", 500);
});

app.get("/timeout", async (c) => {
  await new Promise((resolve) => setTimeout(resolve, 11000));
  return c.text("data after 5 seconds", 200);
});

// services routes
app.route('/auth', authRouter)
app.route('/', projectRouter)
app.route('/', userRouter)
app.route('/', taskRouter)
app.route('/', categoryRouter)

const port = 3000

serve({
  fetch: app.fetch,
  port: Number(process.env.PORT) || port,
})
console.log(`Server is running on port ${process.env.PORT}`)
