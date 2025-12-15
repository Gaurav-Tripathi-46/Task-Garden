import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { PlantGrowth } from "@/components/PlantGrowth";
import { ProgressBar } from "@/components/ProgressBar";
import { TaskInput } from "@/components/TaskInput";
import { TaskItem } from "@/components/TaskItem";
import { loadData, createTask, completeTask, deleteTask } from "@/lib/api";
import type { Task, Stats } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Leaf, AlertCircle } from "lucide-react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, completed: 0, progress: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [addingTask, setAddingTask] = useState(false);
  const [completingTaskId, setCompletingTaskId] = useState<number | null>(null);
  const [deletingTaskId, setDeletingTaskId] = useState<number | null>(null);
  const { toast } = useToast();

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      const data = await loadData();
      setTasks(data.tasks);
      setStats(data.stats);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to load data";
      setError(message);
      toast({
        variant: "destructive",
        title: "Error loading tasks",
        description: message,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddTask = async (title: string) => {
    setAddingTask(true);
    try {
      await createTask({ title });
      await fetchData();
      toast({
        title: "Task added",
        description: "Your task has been added successfully.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to add task";
      toast({
        variant: "destructive",
        title: "Error adding task",
        description: message,
      });
    } finally {
      setAddingTask(false);
    }
  };

  const handleCompleteTask = async (id: number) => {
    setCompletingTaskId(id);
    try {
      await completeTask(id);
      await fetchData();
      toast({
        title: "Task completed",
        description: "Great job! Keep growing your plant!",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to complete task";
      toast({
        variant: "destructive",
        title: "Error completing task",
        description: message,
      });
    } finally {
      setCompletingTaskId(null);
    }
  };

  const handleDeleteTask = async (id: number) => {
    setDeletingTaskId(id);
    try {
      await deleteTask(id);
      await fetchData();
      toast({
        title: "Task deleted",
        description: "The task has been removed.",
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete task";
      toast({
        variant: "destructive",
        title: "Error deleting task",
        description: message,
      });
    } finally {
      setDeletingTaskId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Header />
          <div className="grid gap-6 mt-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center gap-4">
                  <Skeleton className="h-48 w-48 rounded-full" />
                  <Skeleton className="h-4 w-full max-w-xs" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  if (error && tasks.length === 0) {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    return (
      <div className="min-h-screen bg-background">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <Header />
          <Card className="mt-8">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-4 py-8 text-center">
                <AlertCircle className="w-12 h-12 text-destructive" />
                <h3 className="text-lg font-medium">Unable to connect to backend</h3>
                <p className="text-muted-foreground max-w-sm">
                  {error}
                </p>
                {!backendUrl ? (
                  <div className="text-sm text-muted-foreground space-y-2 max-w-md">
                    <p>
                      To connect to your FastAPI backend, set the <code className="px-1 py-0.5 bg-muted rounded text-xs">VITE_BACKEND_URL</code> environment variable to your backend URL.
                    </p>
                    <p className="text-xs">
                      Example: <code className="px-1 py-0.5 bg-muted rounded">https://your-fastapi-app.replit.app</code>
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Make sure the backend server at <code className="px-1 py-0.5 bg-muted rounded text-xs">{backendUrl}</code> is running.
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <Header />
        
        <div className="grid gap-6 mt-8">
          <Card>
            <CardContent className="pt-6">
              <PlantGrowth progress={stats.progress} />
              <div className="mt-6">
                <ProgressBar
                  progress={stats.progress}
                  total={stats.total}
                  completed={stats.completed}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Leaf className="w-5 h-5 text-primary" />
                Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TaskInput onAddTask={handleAddTask} isAdding={addingTask} />
              
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {tasks.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No tasks yet. Add your first task to start growing!</p>
                  </div>
                ) : (
                  tasks.map((task) => (
                    <TaskItem
                      key={task.id}
                      task={task}
                      onComplete={handleCompleteTask}
                      onDelete={handleDeleteTask}
                      isCompleting={completingTaskId === task.id}
                      isDeleting={deletingTaskId === task.id}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <header className="text-center">
      <h1 
        data-testid="text-app-title"
        className="text-3xl md:text-4xl font-bold text-foreground"
      >
        Task Garden
      </h1>
      <p 
        data-testid="text-app-subtitle"
        className="text-muted-foreground mt-2"
      >
        Grow your plant as you complete tasks(developed by Gaurav Tripathi)
      </p>
    </header>
  );
}
