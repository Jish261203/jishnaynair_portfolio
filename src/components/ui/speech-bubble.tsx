'use client';

import React , { useMemo, type JSX  } from "react";
import { cn } from "@/lib/utils"; 
import "@/styles/speech-bubble.css";

export interface SpeechBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  direction?: "left" | "right";
  borderColor?: string;
  bg?: string;
  textColor?: string;
}

 const SpeechBubble = ({
  children,
  className,
  onClick,
  direction,
  borderColor = "#000000",
  bg = "#ffffff",
  textColor = "#000000",
  style,
  ...rest
}: SpeechBubbleProps): JSX.Element => {
  const svgString = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="${borderColor}" /></svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  }, [borderColor]);

  const cssVars = {
    "--Speechbubble-border-color": borderColor,
    "--bubble-bg-color": bg,
    "--bubble-text-color": textColor,
    "--bubble-border-image": svgString,
  } as React.CSSProperties;

  return (
    <div
      data-direction={direction}
      onClick={onClick}
      className={cn(
        // layout
        "relative inline-block cursor-pointer rounded",
        "px-4 py-2 m-1.5",
        // colors via CSS vars
        "bg-[var(--bubble-bg-color)] text-[var(--bubble-text-color)]",
        // remove bottom margin on last direct child
        "[&>*:last-child]:mb-0",
        // custom CSS for tail + pixel border
        "bubble-tail pixel-border",
        className
      )}
      style={{ ...style, ...cssVars }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default SpeechBubble;