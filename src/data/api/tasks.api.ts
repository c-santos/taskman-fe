import type { CreateTask, Task, UpdateTask } from "@/types/task.type";
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

export async function getOneTask(taskId: string) {
  try {
    const res = await apiClient.get<Task>(`${TASKS_BASEURL}/tasks/${taskId}`);

    console.log("[tasks.api.getOneTask] data: ", res.data);

    return res.data;
  } catch (error) {
    console.error("[tasks.api.getOneTask] error: ", error);
    throw error;
  }
}

export async function createTask(data: CreateTask) {
  try {
    const res = await apiClient.post<Task>(`${TASKS_BASEURL}/tasks/`, data);

    console.log("[tasks.api.createTask] data: ", res.data);

    return res.data;
  } catch (error) {
    console.error("[tasks.api.createTask] error: ", error);
    throw error;
  }
}

export async function updateTask(taskId: string, data: UpdateTask) {
  try {
    const res = await apiClient.patch<Task[]>(
      `${TASKS_BASEURL}/tasks/${taskId}`,
      data,
    );

    console.log("[tasks.api.updateTask] data: ", res.data);

    return res.data;
  } catch (error) {
    console.error("[tasks.api.updateTask] error: ", error);
    throw error;
  }
}
