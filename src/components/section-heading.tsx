import React from "react";
import { HyperText } from "./ui/hyper-text";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

const SectionHeading = ({
  children,
  className,
  text,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id: string;
  text: string;
}) => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      id={id}
      className={cn("relative w-full border-b", className)}
    >
      <div className="bg-background absolute top-0 left-0 z-20 rounded-br-md border-r border-b px-4 py-2 font-mono text-xs tracking-wider uppercase">
        <HyperText text={text} />
      </div>

      {children}
    </motion.section>
  );
};

export default SectionHeading;
