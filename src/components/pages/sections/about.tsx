"use client";

import SectionHeading from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HeadingLine from "@/components/ui/heading-line";

import { Robot } from "@/components/ui/robot";
import env from "@/config/env";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

const About = () => {
  return (
    <SectionHeading text="About" id="about" className="overflow-hidden">
      <div className="flex items-center lg:h-[95vh]">
        <div className="relative flex-1 px-4 py-12 md:px-12">
          <h2 className="font-incognito text-2xl font-semibold md:text-5xl lg:text-4xl">
            Meet the Developer,
            <br />
            Not Just the Code
          </h2>

          <HeadingLine className="mt-6" lineWidth={40} />

          <Robot className="absolute top-6 -right-8 z-5 w-64 font-mono text-white max-md:scale-x-[-1] md:top-8 md:right-4">
            <div className="max-md:scale-x-[-1]">Hey👋</div>
          </Robot>

          <div className="text-foreground/70 bg-muted/20 relative z-10 mx-auto mt-6 max-w-3xl rounded-lg border-2 border-dotted text-sm leading-relaxed backdrop-blur-3xl md:text-base">
            <div className="p-6">
              <p className="">
                I build fast, user-friendly products that feel smooth
                <span className="mx-1 inline-block align-middle">
                  <span className="ring-offset-background relative inline-block w-12 rotate-6 overflow-hidden rounded-md ring ring-offset-2">
                    <img
                      src={"/gifs/kawaii%20cat%20GIF.gif"}
                      className="h-auto w-full object-cover object-center"
                      alt="kawaii cat cheering"
                    />
                  </span>
                </span>
                —and easy to love.
              </p>

              <p className="">
                Stack: Next.js, React, TypeScript, Tailwind. Focused on clean
                APIs, subtle interactions, and thoughtful UX details.
                <span className="mx-1 inline-block align-middle">
                  <span className="ring-offset-background relative inline-block w-12 -rotate-3 overflow-hidden rounded-md ring ring-offset-2">
                    <img
                      src={"/gifs/cate%20coding.gif"}
                      className="max-h-8 w-full object-cover object-center"
                      alt="cat intensely coding"
                    />
                  </span>
                </span>
                .
              </p>

              <p className="">
                Off-duty: sports, gaming sessions, exploring bikes & cars, and
                late-night anime binges.
                <span className="mx-1 inline-block align-middle">
                  <span className="ring-offset-background relative inline-block w-12 rotate-3 overflow-hidden rounded-md ring ring-offset-2">
                    <img
                      src={"/gifs/happy%20one%20piece%20GIF.gif"}
                      className="h-auto w-full object-cover object-center"
                      alt="happy One Piece vibe"
                    />
                  </span>
                </span>
                .
              </p>

              <p className="">
                I enjoy collaborative teams, quick feedback cycles, and
                celebrating smooth deploys together.
                <span className="mx-1 inline-block align-middle">
                  <span className="ring-offset-background relative inline-block w-12 -rotate-2 overflow-hidden rounded-md ring ring-offset-2">
                    <img
                      src={
                        "/gifs/One%20Piece%20GIF%20by%20TOEI%20Animation%20UK.gif"
                      }
                      className="h-auto w-full object-cover object-center"
                      alt="One Piece crew teamwork"
                    />
                  </span>
                </span>
                .
              </p>

              <p>
                Got a rough idea or unclear brief?
                <span className="mx-1 inline-block align-middle">
                  <span className="ring-offset-background relative inline-block w-12 rotate-2 overflow-hidden rounded-md ring ring-offset-2">
                    <img
                      src={"/gifs/kirby%20confused.gif"}
                      className="h-auto w-full object-cover object-center"
                      alt="kirby confused but ready"
                    />
                  </span>
                </span>
                Let’s shape it into something solid.
              </p>
            </div>

            <div className="border-t-2 border-dotted p-6">
              <Button
                asChild
                size={"lg"}
                variant={"outline"}
                className="group border-2 font-medium"
              >
                <a href="#contact">
                  Contact Me
                  <ArrowUpRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Left */}
        <div className="relative hidden h-full items-center justify-center border-l md:w-1/2 lg:flex">
          <div className="absolute inset-0 size-full">
            <div className="before:bg-border after:bg-border relative h-full w-full before:absolute before:top-1/2 before:left-0 before:h-0.5 before:w-full after:absolute after:top-0 after:left-1/2 after:h-full after:w-0.5" />
          </div>
          <motion.div
            initial={{ opacity: 0, rotate: -2 }}
            whileInView={{ opacity: 1, rotate: -2 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative py-4 md:w-72"
          >
            <div className="sticky top-8 h-auto w-full">
              {/* Stacked effect */}
              <div className="bg-primary/10 absolute inset-0 rotate-3 rounded-2xl" />
              <div className="bg-primary/20 absolute inset-0 rotate-1 rounded-2xl" />

              {/* Main card */}
              <div className="bg-background relative rounded-2xl border-2 p-6 shadow-xl">
                <div className="text-center">
                  <div className="border-foreground/20 bg-muted/20 mb-4 overflow-hidden rounded-lg border-2 border-dashed p-4">
                    <img
                      src="/ascii_hacker1.png"
                      alt="ASCII"
                      className="-mb-5 h-auto w-full object-cover object-center dark:invert"
                    />
                  </div>
                  <h3 className="font-incognito text-2xl font-semibold">
                    Jishnay
                  </h3>
                  <p className="text-foreground/60 mt-1 font-mono text-sm">
                    @nair
                  </p>

                  {/* Status badges */}
                  <div className="mt-4 flex flex-wrap justify-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("border-green-500/30 bg-green-500/10", {
                        "border-red-500/30 bg-red-500/10":
                          !env.NEXT_PUBLIC_AVAILABLE_STATUS,
                      })}
                    >
                      <div
                        className={cn(
                          "mr-1 h-2 w-2 animate-pulse rounded-full bg-green-500",
                          {
                            "bg-red-500": !env.NEXT_PUBLIC_AVAILABLE_STATUS,
                          },
                        )}
                      />
                      {!env.NEXT_PUBLIC_AVAILABLE_STATUS
                        ? "Not Available"
                        : "Available"}
                    </Badge>
                    <Badge variant="outline">6 Months</Badge>
                    <Badge variant="outline">Full-Stack</Badge>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionHeading>
  );
};

export default About;
