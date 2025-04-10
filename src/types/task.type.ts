export type Task = {
  id: string;
  title: string;
  description: string | null;

  completed: boolean;
  completed_at: Date | null;
  due_date: Date | null;

  created_at: Date;
  updated_at: Date;
};

export type CreateTask = Pick<Task, "title" | "description" | "due_date">;

export type UpdateTask = Pick<
  Task,
  "title" | "description" | "due_date" | "completed" | "completed_at"
>;
