import { relations } from "drizzle-orm";
import {  serial, text,varchar,pgEnum, timestamp, integer, boolean, pgTable } from "drizzle-orm/pg-core";

// users table
export const users = pgTable("users", {
    user_id: serial("user_id").primaryKey(),
    username: varchar("name", { length: 255 }).notNull(),
    email: varchar("email").unique().notNull(),
    password: varchar("password", { length: 100 }).notNull(),
    image_url: varchar('image_url', { length: 100 }),
    role: varchar("role", { length: 255 }).default("user").notNull(),
    date_joined: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  });

  // user relationships
  export const userRelationsips = relations(users, ({ many }) => ({
    reminders: many(Reminders),
    projects: many(projects),
    tasks: many(tasks),
  }))

  //projects enum
  export const project_status = pgEnum("project_status", ["Todo", "InProgress", "Done"]);

  // projects table
  export const projects = pgTable("projects", {
      projects_id: serial("projects_id").primaryKey(),
      user_id: integer("user_id").notNull().references(() => users.user_id, { onDelete: "cascade" }),
      project_name: varchar("project_name", { length: 255 }).notNull(),
      description: varchar("description", { length: 2550 }).notNull(),
      githubRepo: text ("githubRepo"),
      start_date: varchar("start_date", { length: 255 }),
      end_date: varchar("end_date", { length: 255 }),
      project_status: project_status(" project_status").default("Todo").notNull(),
      created_at: timestamp("created_at").defaultNow().notNull(),
      updated_at: timestamp("updated_at").defaultNow().notNull(),
    });

  // project relationships
  export const projectRelationsips = relations(projects, ({ one,many }) => ({
    users: one(users,
      {
        fields: [projects.user_id],
        references: [users.user_id]
      }),
    reminders: many(Reminders),
    tasks: many(tasks),
    workLogs: many(WorkLogs),
    projectCategoryAssignments: many(projectCategoryAssignments),
  }))

  // tasks
  export const task_status = pgEnum("task_status", ["New", "InProgress", "Completed"]);

export const tasks = pgTable("tasks", {
    task_id: serial("id").primaryKey(),
    project_id: integer("project_id").notNull().references(() => projects.projects_id, { onDelete: "cascade" }),
    user_id: integer("user_id").notNull().references(() => users.user_id, { onDelete: "cascade" }),
    task_name: varchar("task_name", { length: 255 }).notNull(),
    description: text("description"),
    due_date: varchar("due_date"),
    task_status: task_status("task_status").default("New").notNull(),
    completed: boolean("completed").default(false),
    priority: integer("priority").notNull().default(0),
    created_at: timestamp("created_at").defaultNow().notNull(),
    updated_at: timestamp("updated_at").defaultNow().notNull(),
  })

//task relationships
export const taskRelationsips = relations(tasks, ({ many,one }) => ({
  reminders: many(Reminders),
  project: one(projects, {
    fields: [tasks.project_id],
    references: [projects.projects_id]
  }),
  users: one(users, {
    fields: [tasks.user_id],
    references: [users.user_id]
  }),
  workLogs: many(WorkLogs),
}))

export const WorkLogs = pgTable("work_logs", {
  id: serial("id").primaryKey(),
  task_id: integer("task_id").notNull().references(() => tasks.task_id, { onDelete: "cascade" }),
  user_id: integer("user_id").notNull().references(() => users.user_id, { onDelete: "cascade" }),
  log_date: timestamp("log_date").notNull(),
  time_spent: varchar("time_spent"),
  description: text("description"),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

// logs relationships
export const workLogRelationsips = relations(WorkLogs, ({ many }) => ({
  reminders: many(Reminders),
}))

// Reminder
export const Reminders = pgTable("reminders", {
  id: serial("id").primaryKey(),
  user_id: integer("user_id").notNull().references(() => users.user_id, { onDelete: "cascade" }),
  project_id: integer("project_id").notNull().references(() => projects.projects_id, { onDelete: "cascade" }),
  remind_date: timestamp("remind_date").notNull(),
  message: text("message").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

// reminder relationships
export const reminderRelationsips = relations(Reminders, ({ many }) => ({
  workLogs: many(WorkLogs),
  users: many(users),
}))

// project categories
export const categories = pgTable ("categories", {
  category_id: serial("category_id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projects.projects_id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

// project category relationships
export const projectCategoryRelationsips = relations(categories, ({ many }) => ({
  projectCategoryAssignments: many(projectCategoryAssignments),
}))

// projectCategoryAssignments
export const projectCategoryAssignments = pgTable ("projectCategoryAssignments", {
  id: serial("id").primaryKey(),
  project_id: integer("project_id").notNull().references(() => projects.projects_id, { onDelete: "cascade" }),
  category_id: integer("category_id").notNull().references(() => categories.category_id, { onDelete: "cascade" }),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
})

export type TIUser = typeof users.$inferInsert;
export type TSUser = typeof users.$inferSelect;
export type TProject = typeof projects.$inferInsert;
export type TProjectSelect = typeof projects.$inferSelect;
export type TITask = typeof tasks.$inferInsert;
export type TSTask = typeof tasks.$inferSelect;
export type TWorkLog = typeof WorkLogs.$inferInsert;
export type TWorkLogSelect = typeof WorkLogs.$inferSelect;
export type TReminder = typeof Reminders.$inferInsert;
export type TCategorySelect = typeof categories.$inferSelect;
export type TCategory = typeof categories.$inferInsert;
export type TProjectCategoryAssignmentSelect = typeof projectCategoryAssignments.$inferSelect;
export type TProjectCategoryAssignment = typeof projectCategoryAssignments.$inferInsert;