# Task Board API

A FastAPI backend for a Task Board application with in-memory storage.

## Overview

This is a RESTful API backend designed to be called by a separate React frontend. It provides endpoints for managing tasks with CRUD operations.

## Tech Stack

- **Framework**: FastAPI (Python 3.11)
- **Server**: Uvicorn (ASGI server)
- **Validation**: Pydantic models
- **Storage**: In-memory (Python list)

## Data Model

### Task
- `id`: int - Auto-generated unique identifier
- `title`: str - Task title
- `completed`: bool - Completion status (default: False)
- `created_at`: datetime - UTC timestamp when created

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check - returns API status message |
| GET | `/tasks` | List all tasks |
| POST | `/tasks` | Create a new task (body: `{"title": "..."}`) |
| PUT | `/tasks/{task_id}/complete` | Mark a task as completed |
| DELETE | `/tasks/{task_id}` | Delete a task |
| GET | `/stats` | Get task statistics (total, completed, progress %) |

## Running the Server

```bash
uvicorn main:app --host 0.0.0.0 --port 5000 --reload
```

## CORS Configuration

CORS is configured to allow all origins for frontend integration:
- Origins: `["*"]`
- Methods: `["GET", "POST", "PUT", "DELETE", "OPTIONS"]`
- Headers: `["*"]`

## Project Structure

```
.
├── main.py           # FastAPI application (all endpoints)
├── requirements.txt  # Python dependencies
├── replit.md         # Project documentation
└── .gitignore        # Git ignore patterns
```
