import db from "../drizzle/db";
import { eq } from "drizzle-orm";
import { categories , TCategory, TCategorySelect } from "../drizzle/schema";

export async function getCategories (): Promise<Array<TCategorySelect>> {
    const category = await db.select().from(categories);
    return category
}

export async function getCategoryById (id: number): Promise<Array<TCategorySelect>> {
    const category = await db.select().from(categories).where(eq(categories.category_id, id));
    return category
};

export async function createCategoryService ( data: TCategory) {
    await db.insert(categories).values(data)
    return "Category Created"
};

export async function updateCategoryServices (id: number, category:TCategory) {
    await db.update(categories).set(category).where(eq(categories.category_id, id));
    return "Category updated succesfully"
};

export async function deleteCategoryService (id: number) {
    await db.delete(categories).where(eq(categories.category_id, id));
    return "Category deleted successfully"
};

//get category projects
export async function getCategoryProjects (id: number) {
    const category = await db.select().from(categories).where(eq(categories.category_id, id));
    return category
}