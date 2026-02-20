"use client";

import { Logo } from "@/components/ui/logo";
import { Robot } from "@/components/ui/robot";
import { useRouter } from "next/navigation";
import { Typewriter } from "@/components/ui/typewriter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Home } from "lucide-react";
import { motion, Variants } from "motion/react";
import { BackgroundNoise } from "@/components/shared/backgrounds";

const TYPEWRITER_MESSAGES = ["Page Not Found", "Got Lost?", "How...?"];

const DesktopNavigationPanel = ({
  side,
  onClick,
  label,
  icon,
}: {
  side: "left" | "right";
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}) => {
  const sideClasses = side === "left" ? "left-0 border-r" : "right-0 border-l";

  return (
    <motion.div
      initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className={`absolute top-0 z-50 flex h-full w-[28.5%] items-end font-mono max-md:hidden ${sideClasses}`}
    >
      <div className="group relative h-35 w-full overflow-hidden">
        {/* Hover gradient  */}
        <div className="from-muted/30 absolute inset-0 bg-gradient-to-t to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="relative grid h-full w-full place-content-center">
          <Button
            variant="link"
            className="text-base transition-transform duration-200 group-hover:scale-105"
            onClick={onClick}
            aria-label={label}
          >
            {side === "left" && icon}
            <span className="mx-2">{label}</span>
            {side === "right" && icon}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

const MobileNavigation = ({
  onBack,
  onHome,
}: {
  onBack: () => void;
  onHome: () => void;
}) => {
  const buttonVariants: Variants = {
    initial: { opacity: 0, y: 50 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  };
  return (
    <div className="absolute inset-x-0 bottom-0 z-50 mx-auto w-full max-w-md px-4 pb-8 md:hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="w-full"
      >
        {/* Buttons */}
        <div className="relative flex flex-col gap-3">
          <motion.div
            custom={0}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
          >
            <Button
              variant="outline"
              onClick={onBack}
              className="group relative h-12 w-full overflow-hidden border-dotted font-mono text-base shadow-lg"
              aria-label="Go back to previous page"
            >
              <ArrowLeft className="mr-2 size-5 transition-transform group-hover:-translate-x-1" />
              <span>Go Back</span>
            </Button>
          </motion.div>

          <motion.div
            custom={1}
            variants={buttonVariants}
            initial="initial"
            animate="animate"
          >
            <Button
              variant="ghost"
              size={"sm"}
              onClick={onHome}
              className="group relative h-12 w-full overflow-hidden border-2 border-dotted font-mono text-base"
              aria-label="Go to home page "
            >
              <Home className="mr-2 size-5" />
              <span>Go Home</span>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mt-4 text-center"
      >
        <p className="text-muted-foreground/60 font-mono text-xs">
          Error Code: <span className="text-red-500">404</span> • Page Not Found
        </p>
      </motion.div>
    </div>
  );
};

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/");
    }
  };
  const handleGoHome = () => router.push("/");

  return (
    <main className="relative h-screen overflow-hidden">
      <nav className="bg-background/80 relative z-40 w-full border-b px-4 py-3.5 backdrop-blur-sm md:px-8">
        <div className="flex items-center justify-between">
          <Logo className="w-12" href="/" />

          <motion.div
            className="text-foreground/50 inline-flex items-center gap-2 font-mono text-xs"
            animate={{ x: [-2, 2, -2, 2, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 3,
            }}
          >
            <div className="size-2 animate-pulse rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
            <span className="tracking-wider">ERROR 404</span>
          </motion.div>
        </div>
      </nav>

      <BackgroundNoise className="z-50" />

      {/*  404 Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center md:bottom-16"
      >
        <div className="text-foreground/5 flex items-center justify-center gap-24 font-mono text-xl leading-none font-semibold select-none sm:gap-x-36 sm:text-2xl md:gap-x-40 md:text-3xl lg:gap-x-60 lg:text-4xl">
          {[4, 0, 4].map((digit, index) => (
            <span
              key={index}
              style={{
                transform: "scaleY(24.5) scaleX(9)",
              }}
              className="hover:text-foreground/10 transition-all duration-300"
            >
              {digit}
            </span>
          ))}
        </div>
      </div>

      {/* Robot  */}
      <Robot className="xs:w-[600px] md:xs:-bottom-40 md:xs:w-[700px] pointer-events-none absolute top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 opacity-90 select-none sm:w-[700px] md:top-auto md:bottom-16 md:w-[800px] md:translate-y-0 md:sm:-bottom-50 lg:-bottom-92 lg:w-[1200px]">
        <div className="noise-screen grid place-content-center">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative z-10 rounded bg-black p-2 text-sm text-white opacity-90 shadow-2xl md:text-base lg:text-3xl"
          >
            <span className="font-bold text-red-500">404:</span>{" "}
            <Typewriter
              text={TYPEWRITER_MESSAGES}
              speed={70}
              waitTime={2000}
              deleteSpeed={50}
              cursorChar="_"
            />
          </motion.h1>
        </div>
      </Robot>

      {/*  Line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="absolute bottom-35 z-50 w-full border-b max-md:hidden"
        style={{ originX: 0.5 }}
      />

      <DesktopNavigationPanel
        side="left"
        onClick={handleGoBack}
        label="Go Back"
        icon={<ArrowLeft className="size-4" />}
      />

      <DesktopNavigationPanel
        side="right"
        onClick={handleGoHome}
        label="Go Home"
        icon={<ArrowRight className="size-4" />}
      />

      <MobileNavigation onBack={handleGoBack} onHome={handleGoHome} />
    </main>
  );
};

export default NotFound;
