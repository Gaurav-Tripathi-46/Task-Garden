# Vibe Task Garden

A delightful task management application where you grow a virtual plant as you complete your tasks. Built with React, Tailwind CSS, and designed to connect to an existing FastAPI backend.

## Overview

This is a frontend application that visualizes task completion progress through a growing plant metaphor. As users complete tasks, their plant grows from a seed to a full tree with sparkles.

## Tech Stack

- **Frontend**: React with Vite, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: shadcn/ui component library
- **State Management**: React hooks with TanStack Query

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── PlantGrowth.tsx    # Plant visualization with 5 growth stages
│   │   ├── ProgressBar.tsx    # Horizontal gradient progress bar
│   │   ├── TaskInput.tsx      # New task input form
│   │   ├── TaskItem.tsx       # Individual task display with checkbox/delete
│   │   └── ui/                # shadcn components
│   ├── lib/
│   │   ├── api.ts             # API service for FastAPI backend
│   │   └── utils.ts           # Utility functions
│   ├── pages/
│   │   └── home.tsx           # Main task board page
│   └── App.tsx                # Root component with routing
shared/
└── schema.ts                   # TypeScript types for Task and Stats
```

## Configuration

### Backend URL

Set the `VITE_BACKEND_URL` environment variable to connect to your FastAPI backend:

```
VITE_BACKEND_URL=https://your-fastapi-backend.replit.app
```

### Expected Backend API

The frontend expects these endpoints on the backend:

- `GET /tasks` - Returns array of tasks `[{ id: number, title: string, completed: boolean }]`
- `POST /tasks` - Creates a new task, body: `{ title: string }`
- `PUT /tasks/{id}/complete` - Marks a task as complete
- `DELETE /tasks/{id}` - Deletes a task
- `GET /stats` - Returns `{ total: number, completed: number, progress: number }`

## Features

### Plant Growth Visualization
- **0%**: Seed in soil (minimal, anticipatory)
- **1-33%**: Small sprout (first signs of growth)
- **34-66%**: Medium plant (visible progress)
- **67-99%**: Big plant (almost complete)
- **100%**: Full tree with sparkles and congratulatory message

### Task Management
- Add new tasks with validation (no empty tasks)
- Mark tasks complete with checkbox
- Delete tasks with trash button
- Completed tasks show with line-through and dimmed appearance

### Progress Tracking
- Horizontal progress bar with gradient that intensifies as progress increases
- Shows "Completed X of Y tasks (Z%)"

## Running the Application

The application runs on port 5000 with `npm run dev`. The Vite development server handles hot module replacement for rapid development.

## User Preferences

- Clean, modern design following the design guidelines
- Nature-inspired green color palette for growth/completion states
- Smooth animations for plant growth transitions
- Responsive design for all screen sizes
