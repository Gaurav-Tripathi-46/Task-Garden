import type { Task, Stats, InsertTask } from "@shared/schema";

// Backend base URL - configurable via environment variable
const BACKEND_BASE_URL = import.meta.env.VITE_BACKEND_URL || "";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(`${BACKEND_BASE_URL}/tasks`);
  return handleResponse<Task[]>(response);
}

export async function fetchStats(): Promise<Stats> {
  const response = await fetch(`${BACKEND_BASE_URL}/stats`);
  return handleResponse<Stats>(response);
}

export async function createTask(task: InsertTask): Promise<Task> {
  const response = await fetch(`${BACKEND_BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
  return handleResponse<Task>(response);
}

export async function completeTask(id: number): Promise<Task> {
  const response = await fetch(`${BACKEND_BASE_URL}/tasks/${id}/complete`, {
    method: "PUT",
  });
  return handleResponse<Task>(response);
}

export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${BACKEND_BASE_URL}/tasks/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `HTTP error! status: ${response.status}`);
  }
}

export async function loadData(): Promise<{ tasks: Task[]; stats: Stats }> {
  const [tasks, stats] = await Promise.all([fetchTasks(), fetchStats()]);
  return { tasks, stats };
}
