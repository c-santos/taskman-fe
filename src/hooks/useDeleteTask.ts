import { deleteTask } from "@/data/api/tasks.api";
import { useMutation } from "@tanstack/react-query";

export function useDeleteTask() {
  const mutation = useMutation({
    mutationFn: async (taskId: string) => await deleteTask(taskId),
  });

  return mutation;
}
