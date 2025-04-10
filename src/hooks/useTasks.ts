import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/data/api/tasks.api";

export function useTasks() {
  const query = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => await getTasks(),
  });

  return query;
}
