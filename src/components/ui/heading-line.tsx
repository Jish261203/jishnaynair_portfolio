import { cn } from "@/lib/utils";
import React from "react";

type HeadingLineProps = {
  className?: string;
  lineWidth?: number; 
}

const HeadingLine: React.FC<HeadingLineProps> = ({ className, lineWidth = 32 }) => {
 
  const widths = [lineWidth, lineWidth / 2, lineWidth / 4];

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {widths.map((w, i) => (
        <div
          key={i}
          className={cn(
            "h-1",
            i === 0
              ? "bg-primary"
              : i === 1
              ? "bg-primary/60"
              : "bg-primary/30"
             
          )}
          style={{ width: `${w}px` }}
        />
      ))}
    </div>
  );
};

export default HeadingLine;
