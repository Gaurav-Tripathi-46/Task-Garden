from datetime import datetime, timezone
from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


class Task(BaseModel):
    id: int
    title: str
    completed: bool = False
    created_at: datetime


class TaskCreate(BaseModel):
    title: str


class TaskResponse(BaseModel):
    id: int
    title: str
    completed: bool
    created_at: datetime


class StatsResponse(BaseModel):
    total: int
    completed: int
    progress: float


class DeleteResponse(BaseModel):
    status: str


class MessageResponse(BaseModel):
    message: str


tasks: List[Task] = []
next_id: int = 1

app = FastAPI(title="Task Board API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/", response_model=MessageResponse)
def root() -> MessageResponse:
    return MessageResponse(message="Task Board API running")


@app.get("/tasks", response_model=List[TaskResponse])
def get_tasks() -> List[Task]:
    return tasks


@app.post("/tasks", response_model=TaskResponse, status_code=201)
def create_task(task_create: TaskCreate) -> Task:
    global next_id
    task = Task(
        id=next_id,
        title=task_create.title,
        completed=False,
        created_at=datetime.now(timezone.utc),
    )
    tasks.append(task)
    next_id += 1
    return task


@app.put("/tasks/{task_id}/complete", response_model=TaskResponse)
def complete_task(task_id: int) -> Task:
    for task in tasks:
        if task.id == task_id:
            task.completed = True
            return task
    raise HTTPException(status_code=404, detail="Task not found")


@app.delete("/tasks/{task_id}", response_model=DeleteResponse)
def delete_task(task_id: int) -> DeleteResponse:
    global tasks
    for i, task in enumerate(tasks):
        if task.id == task_id:
            tasks.pop(i)
            return DeleteResponse(status="deleted")
    raise HTTPException(status_code=404, detail="Task not found")


@app.get("/stats", response_model=StatsResponse)
def get_stats() -> StatsResponse:
    total = len(tasks)
    completed = sum(1 for task in tasks if task.completed)
    progress = (completed / total * 100) if total > 0 else 0.0
    return StatsResponse(total=total, completed=completed, progress=progress)
