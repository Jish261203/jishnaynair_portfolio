"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import { AnimatePresence, motion } from "motion/react";

import useScreenSize from "@/hooks/use-screen-size";
import { useSoundCustom } from "@/hooks/use-sound-custom";

const CLICK_SFX = "/sfx/click.mp3";

const theme = {
  // Background
  "--gb-bg": "#0D0F12",

  // Shell
  "--gb-shell-top": "#E7EAEE",
  "--gb-shell-bottom": "#9FA5AB",
  "--gb-shell-edge-shadow": "rgba(0,0,0,0.35)",

  // Bezel
  "--gb-bezel": "#0A0B0C",
  "--gb-bezel-light": "#1A1B1D",

  // UI plastic (D-Pad, A/B)
  "--gb-ui-light": "#ECEFF1",
  "--gb-ui-mid": "#C9CDD2",
  "--gb-ui-dark": "#9BA1A8",
  "--gb-ui-text": "#B5BDC6",

  // Shadow tints
  "--gb-ui-shadow-1": "rgba(0,0,0,0.45)",
  "--gb-ui-shadow-2": "rgba(0,0,0,0.55)",
  "--gb-ui-shadow-3": "rgba(0,0,0,0.35)",
  "--gb-ui-inset": "#CFD3D8",

  // Screws
  "--gb-metal-border": "#C9CDD2",
  "--gb-metal-1": "#6B7076",
  "--gb-metal-2": "#7A8086",
  "--gb-metal-3": "#AEB5BC",
  "--gb-metal-4": "#8D9399",
  "--gb-screw-dark": "#0B0B0F",
  "--gb-screw-light-1": "#e3e7ea",
  "--gb-screw-light-2": "#32363b",
  "--gb-screw-light-3": "#bfc3c8",

  // Speaker
  "--gb-speaker-light": "#9B9C9F",
  "--gb-speaker-dark": "#838686",
  "--gb-speaker-hole": "#181919",

  // Screen
  "--gb-screen-card": "#F7F9FA",
  "--gb-screen-accent": "#67D0E6",
  "--gb-screen-text": "#161718",

  // Crank
  "--gb-crank-gradient-1": "#bfc3c7",
  "--gb-crank-gradient-2": "#eceff1",
  "--gb-crank-gradient-3": "#7a8086",
  "--gb-crank-gradient-4": "#5e636a",
  "--gb-crank-shadow": "#5a5e63",
  "--gb-crank-body-top": "#d0d5db",
  "--gb-crank-body-mid": "#ffffff",
  "--gb-crank-body-bottom": "#6d737b",
  "--gb-crank-edge": "#aeb4ba",
  "--gb-crank-side-top": "#f6f8fa",
  "--gb-crank-side-mid": "#ccd1d7",
  "--gb-crank-side-bottom": "#a9afb6",
  "--gb-crank-border": "#666",

  // Top slot
  "--gb-slot-color": "#646978",
  "--gb-slot-inset": "#898d91",
};

export type ActionButtonLabel = "A" | "B";
export type DpadButtonLabel = "up" | "down" | "left" | "right";

type DirBtnProps = {
  className?: string;
  onClick?: () => void;
};

type ActionButtonProps = {
  className?: string;
  label: ActionButtonLabel;
  onClick?: () => void;
};

type PlaydateConsoleProps = {
  onActionButtionClick?: (action: ActionButtonLabel) => void;
  onDpadButtonClick?: (action: DpadButtonLabel) => void;
  children?: React.ReactNode;
  open?: boolean;
  isPlaying?: boolean;
  screenFullSize?: boolean;
};

const DirBtn = ({ className, onClick }: DirBtnProps) => {
  const [play] = useSoundCustom(CLICK_SFX);

  const handleClick = () => {
    play();
    onClick?.();
  };
  return (
    <button
      onClick={handleClick}
      className={cn(
        `absolute cursor-pointer border border-[rgba(255,255,255,0)] bg-[linear-gradient(270deg,var(--gb-ui-dark)_0%,var(--gb-ui-mid)_30%,var(--gb-ui-mid)_70%,var(--gb-ui-dark)_100%)] shadow-[0_0_2px_0_var(--gb-ui-shadow-1),0_0_4px_1px_var(--gb-ui-shadow-2),_2px_4px_10px_4px_var(--gb-ui-shadow-3),inset_0_0_0_1px_var(--gb-ui-inset),_inset_0_3px_4px_1px_#fff] transition-all duration-150 after:absolute after:top-[-1px] after:right-[-1px] after:bottom-[-1px] after:left-[-1px] after:rounded-[36px] after:border after:border-[rgba(255,255,255,0)] after:shadow-[inset_10px_60px_2px_-40px_rgba(255,255,255,0.36)] after:content-[''] active:scale-90 active:brightness-110`,
        className,
      )}
    />
  );
};

const DPad = ({
  className,
  onClick,
}: {
  className?: string;
  onClick?: (type: DpadButtonLabel) => void;
}) => {
  return (
    <div
      className={cn(
        "absolute z-50 h-[130px] w-[38px] overflow-visible",
        className,
      )}
    >
      {/* Left */}
      <DirBtn
        className="top-[44px] left-[-47px] h-[42px] w-[67px] rounded-tl-[36px] rounded-bl-[36px]"
        onClick={() => onClick?.("left")}
      />
      {/* Right */}
      <DirBtn
        className="top-[44px] left-[18px] h-[42px] w-[67px] rounded-tr-[36px] rounded-br-[36px]"
        onClick={() => onClick?.("right")}
      />
      {/* Up */}
      <DirBtn
        className="top-0 left-0 h-[48px] w-[38px] rounded-tl-[36px] rounded-tr-[36px]"
        onClick={() => onClick?.("up")}
      />
      {/* Down */}
      <DirBtn
        className="bottom-0 left-0 h-[48px] w-[38px] rounded-br-[36px] rounded-bl-[36px]"
        onClick={() => onClick?.("down")}
      />
      {/* Center piece to fill the gap */}
      <div className="absolute top-[44px] left-0 h-[42px] w-[38px] bg-[linear-gradient(270deg,var(--gb-ui-dark)_0%,var(--gb-ui-mid)_30%,var(--gb-ui-mid)_70%,var(--gb-ui-dark)_100%)] shadow-[inset_0_0_0_1px_var(--gb-ui-inset),_inset_0_20px_4px_1px_#ffffff]" />
    </div>
  );
};

const ScrewPost = ({ className }: { className?: string }) => {
  const screwPostBase = `
  absolute z-[25] size-[52px] border-[14px] border-transparent shadow-[inset_1px_1px_2px_rgba(0,0,0,0.5),inset_-1px_-1px_2px_rgba(255,255,255,0.7)]
  before:absolute before:top-[3px] before:left-[3px]
  before:size-[16px] before:rounded-full before:bg-[var(--gb-screw-dark)]
  before:shadow-[inset_0_-1px_1px_1px_var(--gb-screw-light-1),inset_0_-2px_3px_1px_var(--gb-screw-light-2),inset_-2px_-5px_1px_0_var(--gb-screw-light-3)]
  after:absolute after:right-[-6px] after:bottom-[-6px]
  after:size-[38px] after:rounded-full
  after:bg-[conic-gradient(var(--gb-metal-1)_0%,var(--gb-metal-2)_16%,var(--gb-metal-3)_26%,var(--gb-metal-4)_42%,var(--gb-metal-1)_56%,var(--gb-metal-3)_88%,var(--gb-metal-2)_96%,var(--gb-metal-1)_100%)]
  after:shadow-[inset_0_0_1px_1px_rgba(0,0,0,0.5),inset_0_1px_2px_2px_rgba(255,255,255,0.7),inset_0_-1px_0_2px_rgba(0,0,0,0.5)]
  after:[mask:radial-gradient(farthest-side,transparent_calc(100%-12px),white_calc(100%-11px))]
`;
  return <div className={cn(screwPostBase, className)} />;
};

const ActionButton = ({ className, label, onClick }: ActionButtonProps) => {
  const [play] = useSoundCustom(CLICK_SFX);

  const handleClick = () => {
    play();
    onClick?.();
  };

  return (
    <button
      key={label}
      onClick={handleClick}
      className={cn(
        `after:w-inherit after:h-inherit after:rounded-inherit absolute size-[56px] cursor-pointer rounded-full border border-[rgba(255,255,255,0)] bg-[linear-gradient(270deg,var(--gb-ui-dark)_0%,var(--gb-ui-mid)_30%,var(--gb-ui-mid)_70%,var(--gb-ui-dark)_100%)] shadow-[0_0_2px_0_var(--gb-ui-shadow-1),0_0_4px_1px_var(--gb-ui-shadow-2),_2px_4px_10px_4px_var(--gb-ui-shadow-3),inset_0_0_0_1px_var(--gb-ui-inset),_inset_0_3px_4px_1px_#fff] transition-all duration-150 before:absolute before:inset-0 before:m-auto before:block before:size-[30px] before:items-center before:justify-center before:rounded-[30px] before:bg-[rgba(255,255,255,0.9)] before:text-center before:indent-[1px] before:text-[23px] before:leading-[30px] before:font-[400] before:text-[var(--gb-ui-text)] after:absolute after:top-[-1px] after:left-[-1px] after:border after:border-[rgba(255,255,255,0)] after:shadow-[inset_10px_60px_2px_-40px_rgba(255,255,255,0.36)] after:content-[''] active:scale-90 active:brightness-110`,

        label === "A" ? "before:!content-['A']" : "before:!content-['B']",

        className,
      )}
    />
  );
};

const Speaker = ({ animate = false }: { animate?: boolean }) => {
  const holesVariants = {
    idle: {
      opacity: 1,
    },
    animating: {
      opacity: [1, 0.7, 1, 0.8, 1],
      transition: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "easeInOut",
        stagger: 0.05,
      },
    },
  };

  return (
    <div className="absolute top-28 right-4 z-10 h-[88px] w-[22px] rounded-[10px] border border-transparent bg-[radial-gradient(circle,var(--gb-speaker-light)_0%,var(--gb-speaker-dark)_100%)] shadow-[inset_0_0_0_1px_rgba(130,97,42,0),inset_0_0_8px_1px_rgba(0,0,0,0.6)]">
      <motion.div
        className="absolute top-[4px] right-0 left-0 m-auto h-[4px] w-[4px] rounded-full bg-[var(--gb-speaker-hole)] shadow-[0_5px_0_0_var(--gb-speaker-hole),0_10px_0_0_var(--gb-speaker-hole),0_15px_0_0_var(--gb-speaker-hole),0_20px_0_0_var(--gb-speaker-hole),0_25px_0_0_var(--gb-speaker-hole),0_30px_0_0_var(--gb-speaker-hole),0_35px_0_0_var(--gb-speaker-hole),0_40px_0_0_var(--gb-speaker-hole),0_45px_0_0_var(--gb-speaker-hole),0_50px_0_0_var(--gb-speaker-hole),0_55px_0_0_var(--gb-speaker-hole),0_60px_0_0_var(--gb-speaker-hole),0_65px_0_0_var(--gb-speaker-hole),0_70px_0_0_var(--gb-speaker-hole),0_75px_0_0_var(--gb-speaker-hole),-5px_2.5px_0_0_var(--gb-speaker-hole),-5px_7.5px_0_0_var(--gb-speaker-hole),-5px_12.5px_0_0_var(--gb-speaker-hole),-5px_17.5px_0_0_var(--gb-speaker-hole),-5px_22.5px_0_0_var(--gb-speaker-hole),-5px_27.5px_0_0_var(--gb-speaker-hole),-5px_32.5px_0_0_var(--gb-speaker-hole),-5px_37.5px_0_0_var(--gb-speaker-hole),-5px_42.5px_0_0_var(--gb-speaker-hole),-5px_47.5px_0_0_var(--gb-speaker-hole),-5px_52.5px_0_0_var(--gb-speaker-hole),-5px_57.5px_0_0_var(--gb-speaker-hole),-5px_62.5px_0_0_var(--gb-speaker-hole),-5px_67.5px_0_0_var(--gb-speaker-hole),-5px_72.5px_0_0_var(--gb-speaker-hole),5px_2.5px_0_0_var(--gb-speaker-hole),5px_7.5px_0_0_var(--gb-speaker-hole),5px_12.5px_0_0_var(--gb-speaker-hole),5px_17.5px_0_0_var(--gb-speaker-hole),5px_22.5px_0_0_var(--gb-speaker-hole),5px_27.5px_0_0_var(--gb-speaker-hole),5px_32.5px_0_0_var(--gb-speaker-hole),5px_37.5px_0_0_var(--gb-speaker-hole),5px_42.5px_0_0_var(--gb-speaker-hole),5px_47.5px_0_0_var(--gb-speaker-hole),5px_52.5px_0_0_var(--gb-speaker-hole),5px_57.5px_0_0_var(--gb-speaker-hole),5px_62.5px_0_0_var(--gb-speaker-hole),5px_67.5px_0_0_var(--gb-speaker-hole),5px_72.5px_0_0_var(--gb-speaker-hole)]"
        variants={holesVariants as any}
        initial="idle"
        animate={animate ? "animating" : "idle"}
      />
    </div>
  );
};

const PlaydateConsole = ({
  children,
  onActionButtionClick,
  onDpadButtonClick,
  isPlaying = false,
}: PlaydateConsoleProps) => {
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [play] = useSoundCustom(CLICK_SFX);

  const screenSize = useScreenSize();

  const handlePowerClick = () => {
    play();
    setIsPowerOn((prev) => !prev);
  };

  useEffect(() => {
    const mapping: Record<DpadButtonLabel, string> = {
      up: "ArrowUp",
      down: "ArrowDown",
      left: "ArrowLeft",
      right: "ArrowRight",
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const direction = (Object.keys(mapping) as DpadButtonLabel[]).find(
        (key) => mapping[key] === e.key,
      );

      if (direction && onDpadButtonClick) {
        onDpadButtonClick?.(direction);
      } else if (e.key === "Enter") {
        onActionButtionClick?.("A");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onDpadButtonClick, onActionButtionClick]);

  const PowerButton = (
    <button
      onClick={handlePowerClick}
      className={`after:w-inherit after:h-inherit after:rounded-inherit absolute top-14 right-2.5 z-30 size-[36px] cursor-pointer rounded-full border border-[rgba(255,255,255,0)] bg-[linear-gradient(270deg,var(--gb-ui-dark)_0%,var(--gb-ui-mid)_30%,var(--gb-ui-mid)_70%,var(--gb-ui-dark)_100%)] shadow-[0_0_2px_0_var(--gb-ui-shadow-1),0_0_4px_1px_var(--gb-ui-shadow-2),_2px_4px_10px_4px_var(--gb-ui-shadow-3),inset_0_0_0_1px_var(--gb-ui-inset),_inset_0_3px_4px_1px_#fff] transition-all duration-150 before:absolute before:inset-0 before:m-auto before:block before:!size-[16px] before:h-[30px] before:w-[30px] before:items-center before:justify-center before:rounded-[30px] before:bg-[rgba(255,255,255,0.9)] before:text-center before:indent-[1px] before:font-['Quicksand',sans-serif] before:text-[23px] before:leading-[30px] before:font-[400] before:text-[var(--gb-ui-text)] after:absolute after:top-[-1px] after:left-[-1px] after:border after:border-[rgba(255,255,255,0)] after:shadow-[inset_10px_60px_2px_-40px_rgba(255,255,255,0.36)] after:content-[''] active:scale-90 active:brightness-110`}
    />
  );

  const Crank = (
    <div>
      <div
        className="absolute top-[230px] left-[492px] z-50 h-[44px] w-[7px] shadow-[inset_1px_0_2px_0_rgba(0,0,0,0.4)] max-md:hidden"
        style={{
          background: `linear-gradient(to bottom, var(--gb-crank-gradient-1) 0%, var(--gb-crank-gradient-2) 10%, var(--gb-crank-gradient-1) 16%, var(--gb-crank-gradient-3) 45%, var(--gb-crank-gradient-4) 60%)`,
          boxShadow: `inset 1px 0 2px 0 rgba(0,0,0,0.4), 10px -7px 0 3px var(--gb-crank-shadow)`,
        }}
      >
        <div
          className="absolute top-[-140px] right-[-32px] h-[180px] w-[32px] rounded-[8px_8px_32px_32px] shadow-[inset_0_1px_2px_0_rgba(255,255,255,0.9)]"
          style={{
            background: `linear-gradient(to bottom, var(--gb-crank-body-top) 5%, var(--gb-crank-body-mid) 8%, var(--gb-crank-gradient-1) 18%, var(--gb-crank-gradient-3) 50%, var(--gb-crank-body-bottom) 90%)`,
            boxShadow: `inset 0 1px 2px 0 rgba(255,255,255,0.9), inset 1px 0 2px 0 var(--gb-crank-edge)`,
          }}
        />
        <div
          className="absolute right-[-22px] bottom-[14px] h-[12px] w-[12px] rounded-full border bg-[var(--gb-ui-mid)] shadow-[0_-1px_1px_0_#fff]"
          style={{ borderColor: "var(--gb-crank-border)" }}
        />
      </div>
      <div
        className="absolute top-[84px] left-[534px] h-[56px] w-[74px] rounded-[6px] shadow-[inset_0_1px_2px_0_#f4f6f8,inset_0_-1px_2px_0_#9aa0a7,0_10px_30px_10px_rgba(0,0,0,0.25)] max-md:hidden"
        style={{
          background: `linear-gradient(to bottom, var(--gb-crank-body-top) 0%, var(--gb-ui-mid) 100%)`,
        }}
      >
        <div
          className="absolute top-[10px] left-[-4px] h-[36px] w-[4px] shadow-[3px_0_0_-1px_rgba(255,255,255,0.7)]"
          style={{
            background: `linear-gradient(to bottom, var(--gb-crank-side-top) 0%, var(--gb-crank-side-mid) 60%, var(--gb-crank-side-bottom) 100%)`,
            boxShadow: `3px 0 0 -1px rgba(255,255,255,0.7), 2px 0 5px 1px var(--gb-crank-edge)`,
          }}
        />
      </div>
    </div>
  );

  const flicker = {
    off: { opacity: 0 },
    flicker1: { opacity: 1 },
    flicker2: { opacity: 0 },
    on: { opacity: 1 },
  };

  return (
    <>
      {/* Ripple Effect Behind Console */}
      <AnimatePresence>
        {screenSize.greaterThanOrEqual("lg") && isPlaying && (
          <motion.div
            className="pointer-events-none absolute inset-0"
            exit={{ scale: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
          >
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ width: 100, height: 100, opacity: 0 }}
                animate={{
                  width: [100, 600, 800],
                  height: [100, 600, 800],
                  opacity: [0, 0.3, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.75,
                  ease: "easeOut",
                }}
              >
                <div
                  className="size-full rounded-full border-2"
                  style={{
                    borderColor: `var(--gb-screen-accent)`,
                    boxShadow: `0 0 20px var(--gb-screen-accent), inset 0 0 20px var(--gb-screen-accent)`,
                    filter: "blur(1px)",
                  }}
                />
              </motion.div>
            ))}

            {/* Additional subtle glow pulse */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div
                className="h-[400px] w-[400px] rounded-full"
                style={{
                  background: `radial-gradient(circle, var(--gb-screen-accent) 0%, transparent 70%)`,
                  filter: "blur(40px)",
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Console */}
      <div
        className="relative z-10 h-[510px] w-[492px] rounded-3xl shadow-2xl select-none before:absolute before:-top-1.5 before:right-16 before:z-[25] before:h-1.5 before:w-14 before:rounded-t-[6px] before:shadow-[inset_5px_1px_2px_1px_rgba(255,255,255,0.7),inset_-5px_1px_2px_1px_rgba(255,255,255,0.7)] max-md:w-[442px] max-sm:w-[350px]"
        style={
          {
            ...theme,
            "--gb-slot-shadow": `inset 0 1px 1px 0 var(--gb-slot-inset)`,
          } as React.CSSProperties
        }
      >
        <div
          className="absolute -top-1.5 right-16 z-[25] h-1.5 w-14 rounded-t-[6px]"
          style={{
            background: `var(--gb-slot-color)`,
            boxShadow: `var(--gb-slot-shadow), inset 5px 1px 2px 1px rgba(255,255,255,0.7), inset -5px 1px 2px 1px rgba(255,255,255,0.7)`,
          }}
        />

        <img
          src="/welcome-help.png"
          alt="welcome-help"
          width={150}
          className="absolute right-[492px] bottom-28 brightness-75 contrast-125 invert max-md:hidden dark:invert-0"
        />

        <div
          className="absolute inset-0 z-20 size-full rounded-3xl after:absolute after:inset-0 after:z-30 after:size-full after:rounded-3xl after:shadow-[inset_0_1px_3px_1px_rgba(255,255,255,0.4),inset_0_-1px_2px_1px_rgba(0,0,0,0.25)]"
          style={{
            background: `linear-gradient(180deg, var(--gb-shell-top) 0%, var(--gb-shell-bottom) 100%)`,
          }}
        />

        {/* Main Content */}
        <ScrewPost className="!bottom-0 !left-0 rounded-bl-[50%]" />
        <ScrewPost className="!right-0 !bottom-0 rounded-br-[50%]" />
        <ScrewPost className="top-0 right-0 rounded-tr-[50%] max-sm:hidden" />

        {Crank}

        <div className="relative z-50 size-full rounded-[inherit] p-2.5">
          <DPad
            className="bottom-[54px] left-[97px] max-sm:bottom-[60px] max-sm:left-[80px]"
            onClick={onDpadButtonClick}
          />
          <ActionButton
            className="bottom-[124px] left-[367px] max-sm:bottom-40 max-sm:left-[270px] max-sm:size-12"
            label="A"
            onClick={() => onActionButtionClick?.("A")}
          />
          <ActionButton
            className="bottom-[124px] left-[267px] max-sm:bottom-40 max-sm:left-[200px] max-sm:size-12"
            label="B"
            onClick={() => onActionButtionClick?.("B")}
          />

          {/* Screen/bezel */}
          <div className="inline-flex h-1/2 w-full items-center justify-center">
            <div className="h-full flex-1 overflow-hidden rounded-2xl border-2 border-[var(--gb-bezel)] bg-[var(--gb-bezel)]">
              <div className="size-full overflow-hidden rounded-[inherit] bg-gradient-to-r from-[var(--gb-bezel)] to-[var(--gb-bezel-light)] p-3">
                <motion.div className="relative size-full overflow-hidden bg-[var(--gb-bezel)]">
                  {/* Screen content  */}
                  <AnimatePresence>
                    {isPowerOn && (
                      <motion.div
                        key={"playdate-screen"}
                        className="absolute inset-0 size-full"
                        initial="off"
                        animate={["flicker1", "flicker2", "on"]}
                        variants={flicker}
                        transition={{ times: [0, 0.1, 0.2, 1], duration: 0.5 }}
                      >
                        {children}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            </div>

            <div className="h-full w-11 max-sm:hidden">
              {PowerButton}
              <Speaker animate={isPlaying} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaydateConsole;
