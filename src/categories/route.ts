import { Hono } from 'hono';
import { getAllCategories, getCategory, createCategory, updateCategory, deleteCategory, Categories}from "./controller"

export const categoryRouter = new Hono()

categoryRouter.get('/categories', getAllCategories);
categoryRouter.get('/category/:id', getCategory);
categoryRouter.post('/create-category', createCategory);
categoryRouter.put('/update-category/:id', updateCategory);
categoryRouter.delete('/delete-category/:id', deleteCategory);
categoryRouter.get('/category-projects/:id', Categories);
