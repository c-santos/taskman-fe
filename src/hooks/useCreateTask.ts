import { createTask } from "@/data/api/tasks.api";
import { CreateTask } from "@/types/task.type";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useCreateTask() {
  const mutation = useMutation({
    mutationFn: async (data: CreateTask) => await createTask(data),
  });

  return mutation;
}
