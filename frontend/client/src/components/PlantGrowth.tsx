import { cn } from "@/lib/utils";

interface PlantGrowthProps {
  progress: number;
}

export function PlantGrowth({ progress }: PlantGrowthProps) {
  const getPlantStage = () => {
    if (progress === 0) return "seed";
    if (progress <= 33) return "sprout";
    if (progress <= 66) return "medium";
    if (progress <= 99) return "big";
    return "tree";
  };

  const stage = getPlantStage();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      <div className="relative flex items-end justify-center min-h-[200px]">
        {stage === "seed" && <SeedStage />}
        {stage === "sprout" && <SproutStage />}
        {stage === "medium" && <MediumPlantStage />}
        {stage === "big" && <BigPlantStage />}
        {stage === "tree" && <TreeStage />}
      </div>
      
      {stage === "tree" && (
        <div className="mt-4 text-center animate-bounce">
          <p className="text-lg font-medium text-primary">
            You fully grew your tree!
          </p>
        </div>
      )}
    </div>
  );
}

function SeedStage() {
  return (
    <div className="flex flex-col items-center transition-all duration-700 ease-out">
      <div className="relative">
        <div className="text-4xl opacity-80 animate-pulse">
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-amber-700 dark:text-amber-600">
            <ellipse cx="20" cy="25" rx="8" ry="6" fill="currentColor" />
          </svg>
        </div>
      </div>
      <div className="w-32 h-4 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-full mt-1" />
    </div>
  );
}

function SproutStage() {
  return (
    <div className="flex flex-col items-center transition-all duration-700 ease-out">
      <div className="relative flex flex-col items-center">
        <svg width="60" height="80" viewBox="0 0 60 80" className="animate-[sway_3s_ease-in-out_infinite]">
          <path
            d="M30 80 L30 45"
            stroke="hsl(142, 76%, 36%)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse cx="30" cy="35" rx="12" ry="18" fill="hsl(142, 76%, 45%)" />
          <ellipse cx="30" cy="35" rx="8" ry="12" fill="hsl(142, 76%, 55%)" opacity="0.6" />
        </svg>
      </div>
      <div className="w-32 h-4 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-full -mt-1" />
    </div>
  );
}

function MediumPlantStage() {
  return (
    <div className="flex flex-col items-center transition-all duration-700 ease-out">
      <div className="relative flex flex-col items-center">
        <svg width="100" height="120" viewBox="0 0 100 120" className="animate-[sway_3s_ease-in-out_infinite]">
          <path
            d="M50 120 L50 50"
            stroke="hsl(142, 76%, 30%)"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <ellipse cx="30" cy="60" rx="15" ry="20" fill="hsl(142, 76%, 45%)" transform="rotate(-20, 30, 60)" />
          <ellipse cx="70" cy="55" rx="15" ry="20" fill="hsl(142, 76%, 45%)" transform="rotate(20, 70, 55)" />
          <ellipse cx="50" cy="35" rx="18" ry="25" fill="hsl(142, 76%, 50%)" />
          <ellipse cx="50" cy="35" rx="12" ry="18" fill="hsl(142, 76%, 60%)" opacity="0.5" />
        </svg>
      </div>
      <div className="w-40 h-5 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-full -mt-1" />
    </div>
  );
}

function BigPlantStage() {
  return (
    <div className="flex flex-col items-center transition-all duration-700 ease-out">
      <div className="relative flex flex-col items-center">
        <svg width="140" height="160" viewBox="0 0 140 160" className="animate-[sway_3s_ease-in-out_infinite]">
          <path
            d="M70 160 L70 60"
            stroke="hsl(30, 50%, 30%)"
            strokeWidth="10"
            strokeLinecap="round"
          />
          <path
            d="M70 100 Q40 90, 30 70"
            stroke="hsl(30, 50%, 30%)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M70 90 Q100 80, 110 60"
            stroke="hsl(30, 50%, 30%)"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="20" cy="55" rx="20" ry="25" fill="hsl(142, 76%, 40%)" />
          <ellipse cx="120" cy="45" rx="20" ry="25" fill="hsl(142, 76%, 40%)" />
          <ellipse cx="50" cy="30" rx="25" ry="30" fill="hsl(142, 76%, 45%)" />
          <ellipse cx="90" cy="25" rx="25" ry="30" fill="hsl(142, 76%, 45%)" />
          <ellipse cx="70" cy="15" rx="30" ry="35" fill="hsl(142, 76%, 50%)" />
          <ellipse cx="70" cy="20" rx="20" ry="22" fill="hsl(142, 76%, 60%)" opacity="0.4" />
        </svg>
      </div>
      <div className="w-48 h-6 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-full -mt-1" />
    </div>
  );
}

function TreeStage() {
  return (
    <div className="flex flex-col items-center transition-all duration-700 ease-out">
      <div className="relative flex flex-col items-center">
        <div className="absolute -top-2 left-1/2 -translate-x-1/2">
          <Sparkles />
        </div>
        <svg width="180" height="200" viewBox="0 0 180 200" className="animate-[sway_4s_ease-in-out_infinite]">
          <path
            d="M90 200 L90 80"
            stroke="hsl(30, 40%, 25%)"
            strokeWidth="16"
            strokeLinecap="round"
          />
          <path
            d="M90 140 Q50 130, 30 100"
            stroke="hsl(30, 40%, 25%)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M90 120 Q130 110, 150 80"
            stroke="hsl(30, 40%, 25%)"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="20" cy="75" rx="28" ry="35" fill="hsl(142, 76%, 35%)" />
          <ellipse cx="160" cy="60" rx="28" ry="35" fill="hsl(142, 76%, 35%)" />
          <ellipse cx="50" cy="40" rx="35" ry="42" fill="hsl(142, 76%, 40%)" />
          <ellipse cx="130" cy="35" rx="35" ry="42" fill="hsl(142, 76%, 40%)" />
          <ellipse cx="90" cy="20" rx="45" ry="50" fill="hsl(142, 76%, 45%)" />
          <ellipse cx="90" cy="25" rx="30" ry="32" fill="hsl(142, 76%, 55%)" opacity="0.4" />
          <ellipse cx="75" cy="15" rx="12" ry="14" fill="hsl(142, 76%, 60%)" opacity="0.3" />
          <ellipse cx="110" cy="30" rx="10" ry="12" fill="hsl(142, 76%, 60%)" opacity="0.3" />
        </svg>
      </div>
      <div className="w-56 h-7 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 rounded-t-full -mt-2" />
    </div>
  );
}

function Sparkles() {
  return (
    <div className="relative w-40 h-20">
      <span className="absolute top-0 left-4 text-xl animate-[sparkle_1.5s_ease-in-out_infinite]">
        <svg width="16" height="16" viewBox="0 0 16 16" className="text-yellow-400 fill-current">
          <polygon points="8,0 10,6 16,6 11,10 13,16 8,12 3,16 5,10 0,6 6,6" />
        </svg>
      </span>
      <span className="absolute top-2 right-4 text-lg animate-[sparkle_1.5s_ease-in-out_infinite_0.3s]">
        <svg width="14" height="14" viewBox="0 0 16 16" className="text-yellow-300 fill-current">
          <polygon points="8,0 10,6 16,6 11,10 13,16 8,12 3,16 5,10 0,6 6,6" />
        </svg>
      </span>
      <span className="absolute bottom-0 left-1/2 text-base animate-[sparkle_1.5s_ease-in-out_infinite_0.6s]">
        <svg width="12" height="12" viewBox="0 0 16 16" className="text-yellow-500 fill-current">
          <polygon points="8,0 10,6 16,6 11,10 13,16 8,12 3,16 5,10 0,6 6,6" />
        </svg>
      </span>
      <span className="absolute top-4 left-1/3 text-sm animate-[sparkle_1.5s_ease-in-out_infinite_0.9s]">
        <svg width="10" height="10" viewBox="0 0 16 16" className="text-yellow-400 fill-current">
          <polygon points="8,0 10,6 16,6 11,10 13,16 8,12 3,16 5,10 0,6 6,6" />
        </svg>
      </span>
    </div>
  );
}
