import { Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { Task } from "@shared/schema";

interface TaskItemProps {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  isCompleting?: boolean;
  isDeleting?: boolean;
}

export function TaskItem({
  task,
  onComplete,
  onDelete,
  isCompleting = false,
  isDeleting = false,
}: TaskItemProps) {
  return (
    <div
      data-testid={`task-item-${task.id}`}
      className={cn(
        "group flex items-center gap-3 p-3 rounded-md transition-all duration-300",
        "bg-background border border-border",
        task.completed && "opacity-60"
      )}
    >
      <Checkbox
        data-testid={`checkbox-task-${task.id}`}
        checked={task.completed}
        disabled={task.completed || isCompleting}
        onCheckedChange={() => !task.completed && onComplete(task.id)}
        className="shrink-0"
      />
      
      <span
        data-testid={`text-task-title-${task.id}`}
        className={cn(
          "flex-1 text-sm transition-all duration-300",
          task.completed && "line-through text-muted-foreground"
        )}
      >
        {task.title}
      </span>

      <Button
        data-testid={`button-delete-task-${task.id}`}
        variant="ghost"
        size="icon"
        onClick={() => onDelete(task.id)}
        disabled={isDeleting}
        className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
