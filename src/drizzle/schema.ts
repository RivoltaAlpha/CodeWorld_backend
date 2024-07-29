import {  serial, text,varchar,pgEnum, timestamp, integer, boolean, pgTable } from "drizzle-orm/pg-core";

// users table
export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    username: varchar("name", { length: 255 }).notNull(),
    email: varchar("email").unique().notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    image_url: varchar('image_url', { length: 100 }),
    date_joined: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  });


  //projects enum
export const status = pgEnum("status", ["todo", "doing", "done"]);
// projects table
export const projects = pgTable("projects", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").notNull().references(() => users.id),
    name: varchar("name", { length: 255 }).notNull(),
    description: varchar("description", { length: 2550 }).notNull(),
    githubRepo: text ("githubRepo"),
    start_date: timestamp("start_date"),
    end_date: timestamp("end_date"),
    status: status("status").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  });

  // tasks
export const tasks = pgTable("tasks", {
    id: serial("id").primaryKey(),
    project_id: integer("project_id").notNull().references(() => projects.id),
    name: varchar("name", { length: 255 }).notNull(),
    description: text("description"),
    due_date: timestamp("due_date"),
    completed: boolean("completed").default(false),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  })


export const WorkLogs = pgTable("work_logs", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projects.id),
  user_id: integer("user_id").notNull().references(() => users.id),
  log_date: timestamp("log_date").notNull(),
  time_spent: varchar("time_spent"),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

// Reminder
export const Reminders = pgTable("reminders", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.id),
  project_id: integer("project_id").notNull().references(() => projects.id),
  remind_date: timestamp("remind_date").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})


// project categories
export const categories = pgTable ("categories", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projects.id),
  name: varchar("name", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

// projectCategoryAssignments
export const projectCategoryAssignments = pgTable ("projectCategoryAssignments", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projects.id),
  category_id: integer("category_id").notNull().references(() => categories.id),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

//Relationships Between Tables:
// Users can have multiple Projects.
// Projects can have multiple Tasks.
// Users can have multiple WorkLogs.
// Projects can belong to multiple ProjectCategories through ProjectCategoryAssignments.
// Users can have multiple Reminders.
// Users have one set of UserPreferences.


export type TIUser = typeof users.$inferInsert;
export type TSUser = typeof users.$inferSelect;
export type TProject = typeof projects.$inferInsert;
export type TProjectSelect = typeof projects.$inferSelect;
export type TTask = typeof tasks.$inferInsert;
export type TTaskSelect = typeof tasks.$inferSelect;
export type TWorkLog = typeof WorkLogs.$inferInsert;
export type TWorkLogSelect = typeof WorkLogs.$inferSelect;
export type TReminder = typeof Reminders.$inferInsert;
export type TCategorySelect = typeof categories.$inferSelect;
export type TCategory = typeof categories.$inferInsert;
export type TProjectCategoryAssignmentSelect = typeof projectCategoryAssignments.$inferSelect;
export type TProjectCategoryAssignment = typeof projectCategoryAssignments.$inferInsert;