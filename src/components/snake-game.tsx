"use client";

// Credit ->
// can have some bugs

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useLocalStorage } from "@uidotdev/usehooks";
import type { DpadButtonLabel } from "@/components/ui/playdate-console";
import { cn } from "@/lib/utils";

import { useSoundCustom } from "@/hooks/use-sound-custom";

type Point = { x: number; y: number };
type Direction = DpadButtonLabel;

export type SnakeGameHandle = {
  handleDpad: (action: DpadButtonLabel) => void;
  restart: () => void;
};

type SnakeGameProps = {
  className?: string;
};

const SPEED_MS = 250;
const SNAKE_COLOR = "#F6EAC5";
const FOOD_COLOR = "#F6EAC5";

const SnakeGame = forwardRef<SnakeGameHandle, SnakeGameProps>(
  ({ className }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dims, setDims] = useState({ w: 0, h: 0 });
    const [gridConfig, setGridConfig] = useState({
      cell: 16,
      cols: 20,
      rows: 20,
    });

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useLocalStorage<number>(
      "snake_high_score",
      0,
    );
    const [gameOver, setGameOver] = useState(false);
    const [snake, setSnake] = useState<Point[]>([]);
    const [food, setFood] = useState<Point | null>(null);
    const [eatFlash, setEatFlash] = useState<{
      x: number;
      y: number;
      t: number;
    } | null>(null);

  
    const [playEatFood] = useSoundCustom("/sfx/food.mp3", { volume: 0.5 });
    const [playBackground, { stop: stopBackground }] = useSoundCustom(
      "/sfx/snake-background.mp3",
      { volume: 0.25 , loop: true }, 
    );

    const directionRef = useRef<Direction>("right");
    const nextDirRef = useRef<Direction | null>(null);
    const gameStateRef = useRef({ snake, food });
    const flashTimerRef = useRef<number | null>(null);
    const gameLoopRef = useRef<number | null>(null);
    const newBestRef = useRef(false);

    // Sync refs with state for game loop
    useEffect(() => {
      gameStateRef.current = { snake, food };
    }, [snake, food]);

    // ResizeObserver
    useEffect(() => {
      if (!containerRef.current) return;
      const ro = new ResizeObserver((entries) => {
        const cr = entries[0].contentRect;
        setDims({ w: Math.floor(cr.width), h: Math.floor(cr.height) });
      });
      ro.observe(containerRef.current);
      return () => ro.disconnect();
    }, []);

    const placeFood = useCallback(
      (currentSnake: Point[], cols: number, rows: number) => {
        let p: Point;
        do {
          p = {
            x: Math.floor(Math.random() * cols),
            y: Math.floor(Math.random() * rows),
          };
        } while (currentSnake.some((s) => s.x === p.x && s.y === p.y));
        return p;
      },
      [],
    );

    const initGame = useCallback(() => {
      if (dims.w === 0 || dims.h === 0) return;

      const targetCols = 24;
      const cell = Math.max(8, Math.min(24, Math.floor(dims.w / targetCols)));
      const cols = Math.max(10, Math.floor(dims.w / cell));
      const rows = Math.max(10, Math.floor(dims.h / cell));

      setGridConfig({ cell, cols, rows });

      const cx = Math.floor(cols / 3);
      const cy = Math.floor(rows / 2);
      const initialSnake = [
        { x: cx + 2, y: cy },
        { x: cx + 1, y: cy },
        { x: cx, y: cy },
      ];

      setSnake(initialSnake);
      setFood(placeFood(initialSnake, cols, rows));
      setScore(0);
      setGameOver(false);
      setEatFlash(null);
      directionRef.current = "right";
      nextDirRef.current = null;
      newBestRef.current = false;
    }, [dims.w, dims.h, placeFood]);

    const animateFlash = useCallback((x: number, y: number) => {
      const startTime = performance.now();
      const animate = (t: number) => {
        const progress = Math.min(1, (t - startTime) / 200);
        setEatFlash({ x, y, t: progress });
        if (progress < 1) {
          flashTimerRef.current = requestAnimationFrame(animate);
        } else {
          setEatFlash(null);
        }
      };
      flashTimerRef.current = requestAnimationFrame(animate);
    }, []);

    const gameStep = useCallback(() => {
      const { snake: currentSnake, food: currentFood } = gameStateRef.current;
      const { cols, rows } = gridConfig;
      const dir = nextDirRef.current ?? directionRef.current;

      directionRef.current = dir;
      nextDirRef.current = null;

      const head = currentSnake[0];
      const delta: Record<Direction, Point> = {
        up: { x: 0, y: -1 },
        down: { x: 0, y: 1 },
        left: { x: -1, y: 0 },
        right: { x: 1, y: 0 },
      };
      const newHead = { x: head.x + delta[dir].x, y: head.y + delta[dir].y };

      // Wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= cols ||
        newHead.y < 0 ||
        newHead.y >= rows
      ) {
        setGameOver(true);
        return;
      }

      const willGrow =
        currentFood &&
        newHead.x === currentFood.x &&
        newHead.y === currentFood.y;
      const bodyToCheck = willGrow ? currentSnake : currentSnake.slice(0, -1);

      // Self collision
      if (bodyToCheck.some((s) => s.x === newHead.x && s.y === newHead.y)) {
        setGameOver(true);
        return;
      }

      const newSnake = [newHead, ...currentSnake];
      if (!willGrow) newSnake.pop();

      if (willGrow) {
        playEatFood();            
        animateFlash(newHead.x, newHead.y);
        navigator.vibrate?.(20);

        const newFood = placeFood(newSnake, cols, rows);
        setFood(newFood);

        setScore((prev) => {
          const newScore = prev + 1;
          if (newScore > (highScore ?? 0)) {
            setHighScore(newScore);
            newBestRef.current = true;
          }
          return newScore;
        });
      }

      setSnake(newSnake);
    }, [gridConfig, placeFood, animateFlash, highScore, setHighScore]);

    const restart = useCallback(() => {
      initGame();
    }, [initGame]);

    useImperativeHandle(
      ref,
      () => ({
        handleDpad: (action: DpadButtonLabel) => {
          if (gameOver) return;

          const opposite: Record<Direction, Direction> = {
            up: "down",
            down: "up",
            left: "right",
            right: "left",
          };
          const dirMap: Record<DpadButtonLabel, Direction> = {
            up: "up",
            down: "down",
            left: "left",
            right: "right",
          };

          const newDir = dirMap[action];
          if (!newDir || newDir === opposite[directionRef.current]) return;
          if (nextDirRef.current && nextDirRef.current !== directionRef.current)
            return;

          nextDirRef.current = newDir;
        },
        restart,
      }),
      [gameOver, restart],
    );

    // Initialize game once
    useEffect(() => {
      if (dims.w && dims.h && snake.length === 0) {
        initGame();
      }
    }, [dims.w, dims.h]);

    
    useEffect(() => {
      if (!gameOver) {
        playBackground();
      } else {
        stopBackground(); 
      }
      return () => stopBackground(); 
    }, [gameOver, playBackground, stopBackground]);

    // Game loop
    useEffect(() => {
      if (gameOver || snake.length === 0) return;

      gameLoopRef.current = window.setInterval(gameStep, SPEED_MS);
      return () => {
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
    }, [gameStep, gameOver, snake.length]);

    // Cleanup
    useEffect(() => {
      return () => {
        if (flashTimerRef.current) cancelAnimationFrame(flashTimerRef.current);
        if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      };
    }, []);

    const { cell, cols, rows } = gridConfig;

    return (
      <div
        ref={containerRef}
        className={cn("dark absolute inset-0", className)}
      >
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: cols * cell,
            height: rows * cell,
            backgroundImage: `
              linear-gradient(to right, rgba(246, 234, 197, 0.12) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(246, 234, 197, 0.12) 1px, transparent 1px)
            `,
            backgroundSize: `${cell}px ${cell}px`,
          }}
        >
          {food && (
            <div
              className="absolute"
              style={{
                left: food.x * cell,
                top: food.y * cell,
                width: cell,
                height: cell,
              }}
            >
              <div
                className="relative h-full w-full"
                style={{
                  backgroundColor: FOOD_COLOR,
                  boxShadow: `
                    inset 2px 2px 0 0 rgba(255, 255, 255, 0.3),
                    inset -2px -2px 0 0 rgba(0, 0, 0, 0.28),
                    inset 0 0 0 1px rgba(0, 0, 0, 0.1)
                  `,
                  margin: "1px",
                  width: "calc(100% - 2px)",
                  height: "calc(100% - 2px)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 40%, rgba(0,0,0,0) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          )}

          {snake.map((segment, i) => (
            <div
              key={`${segment.x}-${segment.y}-${i}`}
              className="absolute"
              style={{
                left: segment.x * cell,
                top: segment.y * cell,
                width: cell,
                height: cell,
              }}
            >
              <div
                className="relative h-full w-full"
                style={{
                  backgroundColor: SNAKE_COLOR,
                  boxShadow: `
                    inset 2px 2px 0 0 rgba(255, 255, 255, 0.3),
                    inset -2px -2px 0 0 rgba(0, 0, 0, 0.28),
                    inset 0 0 0 1px rgba(0, 0, 0, 0.1)
                  `,
                  margin: "1px",
                  width: "calc(100% - 2px)",
                  height: "calc(100% - 2px)",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.05) 40%, rgba(0,0,0,0) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
          ))}

          {eatFlash && (
            <div
              className="pointer-events-none absolute"
              style={{
                left: eatFlash.x * cell,
                top: eatFlash.y * cell,
                width: cell,
                height: cell,
              }}
            >
              <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2"
                style={{
                  borderColor: SNAKE_COLOR,
                  width: cell / 2 + eatFlash.t * (cell * 0.8) * 2,
                  height: cell / 2 + eatFlash.t * (cell * 0.8) * 2,
                  opacity: 0.35 * (1 - eatFlash.t),
                }}
              />
            </div>
          )}
        </div>

        {gameOver && (
          <div className="absolute inset-0 z-20 grid place-content-center">
            <div className="bg-background/70 border-border/15 mx-4 w-full max-w-[90%] rounded-xl border p-4 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset,0_10px_30px_rgba(0,0,0,0.15)] backdrop-blur-md">
              <div className="mb-1 text-xs tracking-wide uppercase opacity-70">
                Snake
              </div>
              <div className="text-lg font-bold">Game Over</div>

              <div className="mt-3 flex items-center justify-center gap-2 text-sm">
                <span className="bg-background rounded-md border px-2 py-0.5">
                  Score: <b>{score}</b>
                </span>
                <span className="bg-background rounded-md border px-2 py-0.5">
                  Best: <b>{highScore ?? 0}</b>
                </span>
              </div>

              {newBestRef.current && (
                <div className="mt-2 inline-block rounded-full border border-amber-300/30 bg-amber-200/20 px-2 py-0.5 text-[10px] font-medium text-amber-200">
                  New Best!
                </div>
              )}

              <div className="mt-3 text-[10px] opacity-70">
                A: Restart • B: Back
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);

SnakeGame.displayName = "SnakeGame";

export default SnakeGame;
