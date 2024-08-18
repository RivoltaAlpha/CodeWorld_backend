import { Context } from "hono";
import { getCategories ,getCategoryById, createCategoryService, updateCategoryServices, deleteCategoryService, getCategoryProjects} from "./services"
import exp = require("constants");

export const getAllCategories = async (c: Context) => {
    try{
        const tasks = await getCategories();
        if (tasks == null || tasks.length == 0) {
            return c.text("Categories not found", 404)
        }
        return c.json(tasks, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

export const getCategory = async (c: Context) => {
    try{
        const id = Number(c.req.param('id'))

        const category = await getCategoryById(id);
        if (category == null || category.length == 0){
            return c.text("category not found", 404)
        }
        return c.json(category, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

export const createCategory =  async (c: Context) => {
    try{
        const category =  await c.req.json();
        const createdCategory = await createCategoryService(category);
        if (createdCategory == null || createdCategory.length == 0) {
            return c.text("category not created", 404)
        }
        return c.json(createdCategory, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

export const updateCategory = async (c: Context) => {
    const id = parseInt(c.req.param('id')) 
    if (isNaN(id)) {
        return c.text("Invalid ID", 404)
    }
    try{
        const category =  await c.req.json();
        const updatedCategory = await updateCategoryServices(id, category);
        if (updatedCategory == null || updatedCategory.length == 0) {
            return c.text("Category not updated", 404)
        }
        return c.json(updatedCategory, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};


export const deleteCategory = async (c: Context) => {
    const id = parseInt(c.req.param('id')) 
    if (isNaN(id)) {
        return c.text("Invalid ID", 404)
    }
    try{
        const deletedCategory = await deleteCategoryService(id);
        if (deletedCategory == null || deletedCategory.length == 0) {
            return c.text("Category not deleted", 404)
        }
        return c.json(deletedCategory, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};

export const Categories = async (c: Context) => {
    const id = parseInt(c.req.param('id')) 
    if (isNaN(id)) {
        return c.text("Invalid ID", 404)
    }
    try{
        const categories = await getCategoryProjects(id);
        if (categories == null || categories.length == 0){
            return c.text("Category not found")
        } 
        return c.json(categories, 200);
    }catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};