"use client";
import { NoiseProps } from "@/components/ui/noise";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
import React from "react";

const Noise = dynamic(() => import("@/components/ui/noise"), {
  ssr: false,
});

export const BackgroundNoise = ({ className, ...props }: NoiseProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed top-0 left-0 size-full overflow-hidden",
        className,
      )}
    >
      <Noise
        patternSize={250}
        patternScaleX={1}
        patternScaleY={1}
        patternRefreshInterval={2}
        patternAlpha={15}
        className="!size-full"
        {...props}
      />
    </div>
  );
};

export const BackgroundGridAnimated = () => {
  return (
    <motion.div
      className="absolute inset-0 size-full opacity-0 transition-opacity group-hover:opacity-100"
      
      whileHover={{
        backgroundPosition: ["0px 0px", "30px 30px"],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                      linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: "30px 30px",
      }}
    />
  );
};
