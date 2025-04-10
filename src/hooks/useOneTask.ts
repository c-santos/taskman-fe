import { useQuery } from "@tanstack/react-query";
import { getOneTask } from "@/data/api/tasks.api";

export function useOneTask(taskId: string) {
  const query = useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => await getOneTask(taskId),
  });

  return query;
}
