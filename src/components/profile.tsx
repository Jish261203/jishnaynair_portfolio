"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const GRID = 10;
const TOTAL = GRID * GRID;

const Profile: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [pieces, setPieces] = useState<number[]>([]);
  const randomsRef = useRef<
    { tx: number; ty: number; rot: number; scale: number }[]
  >([]);

  useEffect(() => {
    const arr = Array.from({ length: TOTAL }, (_, i) => i);
    setPieces(arr);
    randomsRef.current = arr.map(() => ({
      tx: (Math.random() - 0.5) * 140,
      ty: (Math.random() - 0.5) * 140,
      rot: (Math.random() - 0.5) * 50,
      scale: 0.4 + Math.random() * 0.9,
    }));
  }, []);

  return (
    <div
      className="relative h-80 w-80 cursor-crosshair md:h-[400px] md:w-[400px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {pieces.map((i) => {
          const row = Math.floor(i / GRID);
          const col = i % GRID;
          const r = randomsRef.current[i];
          const delay = `${i * 4}ms`;

          return (
            <div
              key={i}
              className="relative overflow-hidden"
              style={{
                transition: `transform 700ms cubic-bezier(0.175, 0.885, 0.32, 1.275) ${delay}, opacity 400ms linear ${delay}`,
                transform:
                  isHovered && r
                    ? `translate(${r.tx}px, ${r.ty}px) rotate(${r.rot}deg) scale(${r.scale})`
                    : "translate(0,0) rotate(0) scale(1)",
                opacity: isHovered ? 0.25 : 1,
              }}
            >
              <div
                className="absolute h-[1000%] w-[1000%]"
                style={{ left: `-${col * 100}%`, top: `-${row * 100}%` }}
              >
                <Image
                  src="/jishnay_profile.webp"
                  alt="Profile"
                  fill
                  className="scale-x-99 object-cover object-[center_25%]"
                  priority
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Profile;
