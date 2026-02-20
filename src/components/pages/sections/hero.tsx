"use client";

import Profile from "@/components/profile";
import { Button } from "@/components/ui/button";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Typewriter } from "@/components/ui/typewriter";
import { clientApi } from "@/lib/client-api";
import { cn } from "@/lib/utils";
import env from "@/config/env";
import { useQuery } from "@tanstack/react-query";
import { ArrowDownSquareIcon, ArrowUpRight, Download } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

const Hero = () => {
  const { data: umamiStats } = useQuery({
    queryKey: ["pageViews"],
    queryFn: clientApi.views.getStats,
  });

  return (
    <div className="relative flex flex-col justify-center overflow-hidden border-b pt-12">
      <div className="px-4 pb-6 md:px-8 md:pb-14 lg:px-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center gap-12 text-center md:flex-row md:text-left"
        >
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute -inset-1 rotate-3 rounded-lg border-2" />
              <div className="absolute -inset-1 -rotate-3 rounded-lg border-2" />
              <div className="bg-background relative rounded-lg border-2 p-2">
                <Profile />
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="md:flex-1">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 inline-flex items-center gap-2"
            >
              <div className="bg-background border px-3 py-1">
                <span className="text-foreground/60 font-mono text-xs">
                  {"<"} Hello World {"/>"}
                </span>
              </div>
              <div className="h-px w-12 bg-[#e1e1e1]" />
              <span className="text-foreground/50 font-mono text-xs md:text-sm">
                Full-Stack Developer
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-incognito mb-4 text-3xl leading-tight font-semibold md:text-4xl lg:text-6xl"
            >
              <span className="text-foreground">Hey, I&apos;m </span>
              <span className="relative text-[#8cc2ff] italic">
                <Typewriter
                  text={["Jishnay", "Nair"]}
                  speed={85}
                  waitTime={1500}
                  deleteSpeed={40}
                  cursorChar="|"
                />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-foreground/60 max-w-2xl text-sm font-light md:text-base"
            >
              Fullstack developer with a passion for building web applications.
              I specialize in React, Next.js, Node.js, and TypeScript.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-5 flex items-center gap-4 max-md:mx-auto max-md:justify-center"
            >
              <Button
                asChild
                size="lg"
                className="group/btn border-2 font-medium"
              >
                <a href={"#contact"}>
                  Lets Connect
                  <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="group/btn border-2 font-medium"
                onClick={() =>
                  window.open(env.NEXT_PUBLIC_RESUME_URL, "_blank")
                }
              >
                <Download className="size-4 transition-transform group-hover/btn:translate-y-0.5" />
                Download resume
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/*  Stats Grid */}
      {/* <div className="relative">
        <div className="grid grid-cols-2 border md:max-w-3/4 md:border-0 md:border-t md:border-r lg:grid-cols-4">
          {[
            {
              label: "Portfolio views",
              value: umamiStats?.data?.pageviews ?? 0,
            },
            { label: "Years of Experience", value: 2 },
            { label: "Projects Shipped", value: 8 },
            { label: "Happy Clients", value: 5 },
          ].map((stat, i) => (
            <div
              key={i}
              className={cn(
                "group hover:bg-foreground/5 relative p-8 text-center transition-colors",
                i !== 3 && "border-r",
                i < 2 && "border-b lg:border-b-0",
              )}
            >
              <div className="text-foreground mb-2 text-3xl font-bold">
                <NumberTicker value={stat.value} />+
              </div>
              <div className="text-foreground/50 font-mono text-xs tracking-wider uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        </div> */}
      <div className="text-muted-foreground absolute right-4 bottom-2 hidden items-center justify-center gap-1 font-mono text-xs md:inline-flex">
        SCROLL DOWN
        <ArrowDownSquareIcon className="size-4 animate-pulse" />
      </div>
    </div>
  );
};

export default Hero;
