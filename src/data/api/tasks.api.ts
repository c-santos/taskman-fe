import type { Task } from "@/types/task.type";
import { apiClient } from "./api-client";

const TASKS_BASEURL = process.env.NEXT_PUBLIC_API_BASEURL;

export async function getTasks() {
  try {
    const res = await apiClient.get<Task[]>(`${TASKS_BASEURL}/tasks/`);

    console.log("[tasks.api.getTasks] data: ", res.data);

    return res.data;
  } catch (error) {
    console.error("[tasks.api.getTasks] error: ", error);
    throw error;
  }
}
