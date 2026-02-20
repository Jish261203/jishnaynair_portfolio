// "use client";
// import { motion } from "motion/react";
// import BackgroundAnimation from "@/components/ui/background-gradient";
// import { Logo } from "../ui/logo";
// import { useTheme } from "next-themes";

// export const IntroSplash = () => {
//   const { resolvedTheme } = useTheme();

//   return (
//     <motion.div
//       className="relative top-0 z-20 size-full snap-start overflow-hidden"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.6 }}
//     >
//       <BackgroundAnimation
//         color={resolvedTheme === "light" ? "blue" : "ember"}
//       />

//       <motion.div
//         className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
//         initial={{ opacity: 0, y: 24, scale: 0.98 }}
//         animate={{ opacity: 1, y: 0, scale: 1 }}
//         transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
//       >
//         {/* Sizing increased for a longer name, and animationTime set to 5s for a natural pace */}
//         <Logo className="w-56 sm:w-72 md:w-96 @max-md:w-48" animationTime={8} />
//       </motion.div>

//       <motion.div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-2 font-semibold text-white @max-md:hidden">
//         Scroll down
//         <motion.div className="flex h-10 w-7 justify-center rounded-lg border-2 border-white/40 bg-white/20 backdrop-blur-2xl">
//           <motion.div
//             className="mx-auto w-1 rounded-xl bg-white/80 backdrop-blur-2xl @max-sm:w-0.5"
//             animate={{
//               y: [4, 12, 4],
//               height: [4, 8, 4],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Infinity,
//               repeatType: "loop",
//               ease: "easeInOut",
//             }}
//           />
//         </motion.div>
//       </motion.div>
//     </motion.div>
//   );
// };

"use client";
import { motion } from "motion/react";
import BackgroundAnimation from "@/components/ui/background-gradient";
import { Logo } from "../ui/logo";
import { useTheme } from "next-themes";

export const IntroSplash = () => {
  const { resolvedTheme } = useTheme();

  return (
    <motion.div
      className="relative top-0 z-20 size-full snap-start overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <BackgroundAnimation
        color={resolvedTheme === "light" ? "blue" : "ember"}
      />

      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
      >
        {/* Update these width values */}
        <Logo className="w-64 sm:w-80 md:w-[500px] lg:w-[600px]" />
      </motion.div>

      <motion.div className="pointer-events-none absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center justify-center gap-2 font-semibold text-white @max-md:hidden">
        Scroll down
        <motion.div className="flex h-10 w-7 justify-center rounded-lg border-2 border-white/40 bg-white/20 backdrop-blur-2xl">
          <motion.div
            className="mx-auto w-1 rounded-xl bg-white/80 backdrop-blur-2xl @max-sm:w-0.5"
            animate={{
              y: [4, 12, 4],
              height: [4, 8, 4],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};