import { updateTask } from "@/data/api/tasks.api";
import { UpdateTask } from "@/types/task.type";
import { useMutation } from "@tanstack/react-query";

export function useUpdateTask(taskId: string) {
  const mutation = useMutation({
    mutationFn: async (data: UpdateTask) => await updateTask(taskId, data),
  });

  return mutation;
}
