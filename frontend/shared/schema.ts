import { z } from "zod";

// Task schema for the Task Board app
export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export const insertTaskSchema = z.object({
  title: z.string().min(1, "Task title is required"),
});

export const statsSchema = z.object({
  total: z.number(),
  completed: z.number(),
  progress: z.number(),
});

export type Task = z.infer<typeof taskSchema>;
export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Stats = z.infer<typeof statsSchema>;
