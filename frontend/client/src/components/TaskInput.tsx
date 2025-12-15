import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TaskInputProps {
  onAddTask: (title: string) => void;
  isAdding?: boolean;
}

export function TaskInput({ onAddTask, isAdding = false }: TaskInputProps) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    if (trimmedTitle) {
      onAddTask(trimmedTitle);
      setTitle("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        data-testid="input-new-task"
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isAdding}
        className="flex-1"
      />
      <Button
        data-testid="button-add-task"
        type="submit"
        disabled={!title.trim() || isAdding}
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Task
      </Button>
    </form>
  );
}
