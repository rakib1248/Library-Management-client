import { BookOpen } from "lucide-react";

export function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const text =
    size === "lg" ? "text-3xl" : size === "sm" ? "text-lg" : "text-2xl";
  const box =
    size === "lg" ? "h-11 w-11" : size === "sm" ? "h-7 w-7" : "h-9 w-9";
  return (
    <div className="flex items-center gap-3">
      <div
        className={`${box} rounded-lg bg-gradient-primary flex items-center justify-center shadow-glow`}>
        <BookOpen
          className="h-1/2 w-1/2 text-primary-foreground"
          strokeWidth={2.5}
        />
      </div>
      <div
        className={`${text} font-serif text-gradient leading-none tracking-tight`}>
        BookLoop
      </div>
    </div>
  );
}
