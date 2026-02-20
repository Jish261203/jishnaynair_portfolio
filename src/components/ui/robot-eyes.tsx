"use client";

import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

// TYPES
type EyeSize = "sm" | "md" | "lg" | "xl";
type EyeShape = "normal" | "happy" | "angry" | "surprised" | "sleepy";

type GlowConfig = {
  level?: number;
  color?: string;
  animated?: boolean;
};

type MouseFollowConfig = {
  enabled?: boolean;
  stiffness?: number;
  containerRef?: React.RefObject<HTMLElement>;
  maxX?: number;
  maxY?: number;
};

type LookAroundConfig = {
  enabled?: boolean;
  duration?: number; // Total duration for one cycle
  sequence?: {
    x: number[];
    scaleY: number[];
    times: number[];
  };
};

type EyesClasses = {
  container?: string;
  eye?: string;
};

type EyesProps = {
  className?: string;
  mouseFollow?: MouseFollowConfig;
  classes?: EyesClasses;
  size?: EyeSize;
  eyeColor?: string;
  glow?: GlowConfig;
  shape?: EyeShape;
  lookAround?: LookAroundConfig;
  pause?: boolean;
};

//  PRESETS
const SIZE_PRESETS: Record<
  EyeSize,
  { width: string; height: string; gap: string }
> = {
  sm: { width: "w-2", height: "h-[8px]", gap: "gap-3" },
  md: { width: "w-2.5", height: "h-[12px]", gap: "gap-6" },
  lg: { width: "w-3.5", height: "h-[16px]", gap: "gap-8" },
  xl: { width: "w-5", height: "h-[20px]", gap: "gap-10" },
};

const SHAPE_STYLES: Record<EyeShape, string> = {
  normal: "",
  happy: "rounded-b-full",
  angry: "",
  surprised: "scale-110",
  sleepy: "scale-y-50",
};

// Default look around: right -> center+blink -> left -> center+blink
const DEFAULT_LOOK_SEQUENCE = {
  x: [0, 2, 2, 0, 0, 0, -2, -2, 0, 0, 0],
  scaleY: [1, 1, 1, 1, 0.1, 1, 1, 1, 1, 0.1, 1],
  times: [0, 0.15, 0.25, 0.35, 0.4, 0.45, 0.6, 0.7, 0.8, 0.85, 0.9],
};

export const Eyes = ({
  className,
  mouseFollow,
  classes = {},
  size = "md",
  eyeColor = "#F6EAC5",
  glow,
  shape = "normal",
  lookAround,
  pause = false,
}: EyesProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  const sizeConfig = SIZE_PRESETS[size];

  useEffect(() => {
    if (!mouseFollow?.enabled || pause) {
      setMousePos({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        let targetX = e.clientX;
        let targetY = e.clientY;

        if (mouseFollow.containerRef?.current) {
          const boundRect =
            mouseFollow.containerRef.current.getBoundingClientRect();
          targetX = Math.max(
            boundRect.left,
            Math.min(boundRect.right, targetX),
          );
          targetY = Math.max(
            boundRect.top,
            Math.min(boundRect.bottom, targetY),
          );
        }

        const maxX = mouseFollow.maxX ?? 15;
        const maxY = mouseFollow.maxY ?? 10;

        const angleX = Math.max(
          -maxX,
          Math.min(maxX, (targetX - centerX) / 15),
        );
        const angleY = Math.max(
          -maxY,
          Math.min(maxY, (targetY - centerY) / 15),
        );

        setMousePos({ x: angleX, y: angleY });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    mouseFollow?.enabled,
    mouseFollow?.containerRef,
    mouseFollow?.maxX,
    mouseFollow?.maxY,
    pause,
  ]);

  useEffect(() => {
    if (!mouseFollow?.enabled || pause) return;

    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 150);
    }, 3000);

    return () => clearInterval(blinkInterval);
  }, [mouseFollow?.enabled, pause]);

  const glowStyle = React.useMemo(() => {
    if (!glow?.level || glow.level === 0) return {};
    const intensity = glow.level * 3;
    const color = glow.color || "#FFD700";
    return {
      boxShadow: `0 0 ${intensity}px ${color}, inset 0 0 ${intensity / 2}px ${color}`,
    };
  }, [glow?.level, glow?.color]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "inline-flex items-center justify-center",
        sizeConfig.gap,
        classes.container,
        className,
      )}
    >
      {[0, 1].map((index) => (
        <Eye
          key={index}
          index={index}
          mousePos={mousePos}
          isBlinking={isBlinking}
          mouseFollow={mouseFollow}
          sizeConfig={sizeConfig}
          eyeColor={eyeColor}
          glowStyle={glowStyle}
          glow={glow}
          shape={shape}
          classes={classes}
          lookAround={lookAround}
          pause={pause}
        />
      ))}
    </div>
  );
};

//  EYE
type EyeProps = {
  index: number;
  mousePos: { x: number; y: number };
  isBlinking: boolean;
  mouseFollow?: MouseFollowConfig;
  sizeConfig: (typeof SIZE_PRESETS)[EyeSize];
  eyeColor: string;
  glowStyle: React.CSSProperties;
  glow?: GlowConfig;
  shape: EyeShape;
  classes: EyesClasses;
  lookAround?: LookAroundConfig;
  pause: boolean;
};

const Eye = React.memo(
  ({
    index,
    mousePos,
    isBlinking,
    mouseFollow,
    sizeConfig,
    eyeColor,
    glowStyle,
    glow,
    shape,
    classes,
    lookAround,
    pause,
  }: EyeProps) => {
    const shapeClass = SHAPE_STYLES[shape];
    const angryRotation = shape === "angry" ? (index === 0 ? -10 : 10) : 0;

    const animate: any = {};
    const transition: any = {};

    if (!pause) {
      if (mouseFollow?.enabled) {
        animate.scaleY = isBlinking ? 0.1 : 1;
        animate.x = mousePos.x;
        animate.y = mousePos.y;

        transition.scaleY = { duration: 0.1 };
        transition.x = {
          type: "spring",
          stiffness: mouseFollow.stiffness ?? 100,
        };
        transition.y = {
          type: "spring",
          stiffness: mouseFollow.stiffness ?? 100,
        };
      } else if (lookAround?.enabled) {
        // Look around mode
        const sequence = lookAround.sequence ?? DEFAULT_LOOK_SEQUENCE;
        const duration = lookAround.duration ?? 6;

        animate.x = sequence.x;
        animate.scaleY = sequence.scaleY;

        transition.duration = duration;
        transition.repeat = Infinity;
        transition.repeatType = "loop";
        transition.times = sequence.times;
        transition.ease = "easeInOut";
      }

      // Animated glow
      if (glow?.animated && glow.level && glow.level > 0) {
        const glowColor = glow.color || "#FFD700";
        animate.filter = [
          `brightness(1) drop-shadow(0 0 ${glow.level}px ${glowColor})`,
          `brightness(1.2) drop-shadow(0 0 ${glow.level * 2}px ${glowColor})`,
          `brightness(1) drop-shadow(0 0 ${glow.level}px ${glowColor})`,
        ];

        if (!transition.filter) {
          transition.filter = {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          };
        }
      }
    }

    return (
      <motion.div
        className={cn(
          "relative origin-center ring-2 ring-black",
          sizeConfig.width,
          sizeConfig.height,
          shapeClass,
          classes.eye,
        )}
        style={{
          backgroundColor: eyeColor,
          ...glowStyle,
          rotate: angryRotation,
        }}
        animate={animate}
        transition={transition}
      />
    );
  },
);

Eye.displayName = "Eye";
