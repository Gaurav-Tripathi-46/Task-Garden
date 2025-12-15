import { cn } from "@/lib/utils";

interface ProgressBarProps {
  progress: number;
  total: number;
  completed: number;
}

export function ProgressBar({ progress, total, completed }: ProgressBarProps) {
  const getGradientClass = () => {
    if (progress === 0) return "from-gray-300 to-gray-400";
    if (progress <= 25) return "from-emerald-300 to-emerald-400";
    if (progress <= 50) return "from-emerald-400 to-green-500";
    if (progress <= 75) return "from-green-500 to-green-600";
    if (progress < 100) return "from-green-600 to-emerald-600";
    return "from-emerald-500 via-green-500 to-teal-500";
  };

  return (
    <div className="w-full space-y-2">
      <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-all duration-700 ease-out",
            getGradientClass()
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-sm text-muted-foreground text-center">
        Completed <span className="font-medium text-foreground">{completed}</span> of{" "}
        <span className="font-medium text-foreground">{total}</span> tasks (
        <span className="font-medium text-primary">{Math.round(progress)}%</span>)
      </p>
    </div>
  );
}
