"use client";

import SectionHeading from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HeadingLine from "@/components/ui/heading-line";
import ReelPlayer from "@/components/ui/reel-player";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ExternalLink, Play } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type Reel = {
  id: string;
  title: string;
  kind: string;
  date: string;
  duration: string;
  /** Numeric duration so the player's readout is right before metadata loads. */
  seconds: number;
  src: string;
  poster: string;
  description: string;
  highlights: string[];
  tags: string[];
  /** Set a URL and the "View live" button appears on its own. */
  live: string | null;
};

const reels: Reel[] = [
  {
    id: "01",
    title: "Café Haven",
    kind: "All-day café · Online ordering",
    date: "AUG 2026",
    duration: "0:50",
    seconds: 50.1,
    src: "/videos/cafe-haven.mp4",
    poster: "/videos/posters/cafe-haven.webp",
    description:
      "An all-day café taken online end to end — a filterable menu, a slide-in basket that updates live, and a checkout where regulars pick collection from the counter or delivery to the door. Built so the café takes orders without adding work to the morning rush.",
    highlights: [
      "Filterable menu — coffee, pastries, vegetarian",
      "Slide-in basket with live quantity steppers",
      "Collection or delivery chosen at checkout",
      "Secure hosted checkout with order summary",
    ],
    tags: ["Café / F&B", "Online Ordering", "Basket & Checkout", "INR Pricing"],
    live: null,
  },
  {
    id: "02",
    title: "FUEL/",
    kind: "Protein & nutrition · E-commerce",
    date: "AUG 2026",
    duration: "0:38",
    seconds: 37.6,
    src: "/videos/fuel-up.mp4",
    poster: "/videos/posters/fuel-up.webp",
    description:
      "A premium storefront for a high-protein snack and supplement brand — category browsing, product cards carrying ratings and compare-at pricing, and a cart drawer that nudges shoppers over the free-shipping threshold. Built to read like a DTC brand site, not a template store.",
    highlights: [
      "Category browse — bars, cookies, powders",
      "Product grid with ratings and compare-at pricing",
      "Cart drawer with a free-shipping progress meter",
      "Search, wishlist and account entry points",
    ],
    tags: [
      "E-commerce",
      "Product Catalogue",
      "Cart & Checkout",
      "INR Pricing",
    ],
    live: null,
  },
];

const tagColors: Record<string, string> = {
  "Café / F&B": "border-amber-500/30 bg-amber-500/10 text-amber-600",
  "Online Ordering": "border-orange-500/30 bg-orange-500/10 text-orange-600",
  "Basket & Checkout": "border-rose-500/30 bg-rose-500/10 text-rose-600",
  "INR Pricing": "border-teal-500/30 bg-teal-500/10 text-teal-600",
  "E-commerce": "border-blue-500/30 bg-blue-500/10 text-blue-600",
  "Product Catalogue": "border-violet-500/30 bg-violet-500/10 text-violet-600",
};

const total = String(reels.length).padStart(2, "0");

const ClientWork = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = reels[activeIndex];

  return (
    <SectionHeading id="client-work" text="Client Work">
      {/* Intro */}
      <div className="relative border-b px-6 pt-14 pb-10 md:px-12 md:pt-16 lg:px-16">
        <div className="mb-5 flex items-center gap-4">
          <div className="h-px w-8 bg-blue-500" />
          <span className="text-foreground/40 font-mono text-xs tracking-[0.2em] uppercase">
            Delivered_Builds
          </span>
        </div>

        <h2 className="font-incognito max-w-2xl text-3xl font-bold tracking-tight lg:text-4xl">
          Walkthroughs of what I shipped.
        </h2>
        <HeadingLine className="mt-4" />

        <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-relaxed md:text-base">
          Screen recordings of client builds — complete flows from landing page
          to checkout, captured from the working site. Press play instead of
          asking me for a file.
        </p>
      </div>

      <div className="grid lg:grid-cols-12">
        {/* Player + detail */}
        <div className="relative lg:col-span-8">
          <div className="flex items-center justify-between gap-3 border-b px-6 py-3 md:px-12 lg:px-16">
            <span className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
              Reel_{active.id}
              <span className="text-foreground/20"> / {total}</span>
            </span>
            <span className="text-foreground/30 font-mono text-[10px] tracking-widest uppercase">
              1440×724 · {active.duration}
            </span>
          </div>

          <div className="px-6 py-10 md:px-12 md:py-12 lg:px-16">
            <ReelPlayer
              key={active.src}
              src={active.src}
              poster={active.poster}
              title={active.title}
              fallbackDuration={active.seconds}
            />
          </div>

          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden border-t px-6 py-10 md:px-12 md:py-12 lg:px-16"
          >
            {/* Meta */}
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <time className="text-muted-foreground font-mono text-xs">
                {active.date}
              </time>
              <div className="bg-border h-4 w-px" />
              <div className="inline-flex items-center gap-1.5">
                <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
                <span className="text-muted-foreground font-mono text-xs uppercase">
                  delivered
                </span>
              </div>
              <div className="bg-border h-4 w-px" />
              <span className="text-muted-foreground font-mono text-xs">
                {active.duration}
              </span>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h3 className="font-incognito text-3xl font-bold lg:text-4xl">
                {active.title}
              </h3>
              <p className="text-foreground/40 mt-2 font-mono text-[11px] tracking-widest uppercase">
                {active.kind}
              </p>
              <HeadingLine className="mt-3" />
            </div>

            <p className="text-muted-foreground mb-8 max-w-2xl text-sm leading-relaxed md:text-base">
              {active.description}
            </p>

            {/* Highlights */}
            <div className="mb-8">
              <div className="mb-4 flex items-center gap-4">
                <div className="h-px w-8 bg-blue-500" />
                <span className="text-foreground/40 font-mono text-xs tracking-[0.2em] uppercase">
                  In_This_Reel
                </span>
              </div>

              <div className="space-y-3">
                {active.highlights.map((highlight, index) => (
                  <div
                    key={highlight}
                    className="group/item flex gap-4 border-l-2 border-transparent pl-4 transition-colors duration-300 hover:border-blue-500"
                  >
                    <span className="mt-0.5 font-mono text-xs text-blue-500/40">
                      0{index + 1}
                    </span>
                    <p className="text-foreground/70 group-hover/item:text-foreground text-sm leading-relaxed transition-colors">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Shortcuts + optional live link */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
              <p className="text-foreground/30 font-mono text-[10px] tracking-wider uppercase">
                <kbd className="text-foreground/50">Space</kbd> play ·{" "}
                <kbd className="text-foreground/50">← →</kbd> seek 5s ·{" "}
                <kbd className="text-foreground/50">F</kbd> fullscreen ·{" "}
                <kbd className="text-foreground/50">M</kbd> mute
              </p>

              {active.live && (
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="group/btn border-2 font-medium"
                >
                  <a
                    href={active.live}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    View Live
                    <ArrowUpRight className="ml-1 h-3 w-3 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </Button>
              )}
            </div>

            {/* Decorative corner, same as the experience cards */}
            <div className="absolute right-0 bottom-0 h-12 w-12 opacity-10">
              <div className="border-foreground absolute right-2 bottom-2 h-4 w-4 border-r-2 border-b-2" />
            </div>
          </motion.div>
        </div>

        {/* Reel selector */}
        <div className="relative border-t lg:col-span-4 lg:border-t-0 lg:border-l">
          <div className="border-b px-6 py-3 md:px-12 lg:px-8">
            <span className="text-foreground/40 font-mono text-[10px] tracking-widest uppercase">
              Select_Reel
            </span>
          </div>

          <div className="divide-y">
            {reels.map((reel, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={reel.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-current={isActive}
                  aria-label={`Play ${reel.title} — ${reel.duration}`}
                  className={cn(
                    "group/reel focus-visible:ring-ring/50 relative flex w-full items-center gap-4 px-6 py-4 text-left transition-colors focus-visible:ring-2 focus-visible:outline-none md:px-12 lg:px-8",
                    isActive
                      ? "bg-foreground/[0.04]"
                      : "hover:bg-foreground/[0.02]",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="reel-indicator"
                      className="absolute inset-y-0 left-0 w-1 bg-blue-500"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <span
                    className={cn(
                      "shrink-0 font-mono text-xs transition-colors",
                      isActive ? "text-blue-500" : "text-foreground/30",
                    )}
                  >
                    {reel.id}
                  </span>

                  <div
                    className="bg-muted relative w-20 shrink-0 overflow-hidden border sm:w-24"
                    style={{ aspectRatio: "1440 / 724" }}
                  >
                    <img
                      src={reel.poster}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover"
                    />
                    <span
                      className={cn(
                        "absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity",
                        isActive
                          ? "opacity-100"
                          : "opacity-0 group-hover/reel:opacity-100",
                      )}
                    >
                      <Play className="size-4 translate-x-px text-white" />
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="font-incognito truncate text-sm font-bold">
                      {reel.title}
                    </p>
                    <p className="text-foreground/40 truncate font-mono text-[10px] tracking-wider uppercase">
                      {reel.kind}
                    </p>
                  </div>

                  <span className="text-foreground/30 shrink-0 font-mono text-[10px]">
                    {reel.duration}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Scope of the active reel */}
          <div className="px-6 py-8 md:px-12 lg:px-8">
            <div className="border-foreground/10 bg-muted/5 rounded-lg border border-dashed p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="text-foreground/40 font-mono text-[10px] uppercase underline underline-offset-4">
                  Scope_Delivered
                </span>
                <span className="font-mono text-[10px] text-blue-500/50">
                  {active.id}/{total}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {active.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className={cn(
                      "rounded-none border px-2.5 py-1 font-mono text-[11px]",
                      tagColors[tag],
                    )}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionHeading>
  );
};

export default ClientWork;
