"use client";

import { cn } from "@/lib/utils";
import { XIcon, MenuIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ThemeToggleButton2 } from "../../theme-toggle";
import { Logo } from "../../ui/logo";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/config/site";
import { useIsSoundEnabled } from "@/store/use-sound-enabled";

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "stats", label: "Stats" },
  { id: "contact", label: "Contact" },
] as const;

type NavId = (typeof NAV_LINKS)[number]["id"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<NavId>("home");
  const { isSoundEnabled, toggleSoundEnabled } = useIsSoundEnabled();
  const { resolvedTheme, setTheme } = useTheme();

  const overlayRef = useRef<HTMLDivElement | null>(null);
  const activeTabRef = useRef<HTMLAnchorElement | null>(null);

  // Update active tab from URL hash
  useEffect(() => {
    const ids = NAV_LINKS.map((x) => x.id);
    const setFromHash = () => {
      const hash =
        (typeof window !== "undefined" && window.location.hash) || "";
      const id = (hash.replace("#", "") || "home") as NavId;
      setActive(ids.includes(id) ? id : "home");
    };
    setFromHash();
    window.addEventListener("hashchange", setFromHash);
    return () => window.removeEventListener("hashchange", setFromHash);
  }, []);

  // Compute clip-path for animated tabs highlight
  const updateClip = () => {
    const container = overlayRef.current;
    const target = activeTabRef.current;
    if (!container || !target) return;

    const cRect = container.getBoundingClientRect();
    const tRect = target.getBoundingClientRect();

    // Position of the active tab relative to the overlay container
    let left = tRect.left - cRect.left;
    let right = cRect.right - tRect.right;

    // Small padding so the highlight looks cushioned
    const pad = 6;
    left = Math.max(0, left - pad);
    right = Math.max(0, right - pad);

    const leftPct = (left / cRect.width) * 100;
    const rightPct = (right / cRect.width) * 100;

    container.style.clipPath = `inset(0 ${rightPct.toFixed(2)}% 0 ${leftPct.toFixed(2)}% round 17px)`;
  };

  useEffect(() => {
    // Update after layout settles
    const id = requestAnimationFrame(updateClip);
    window.addEventListener("resize", updateClip);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", updateClip);
    };
  }, [active]);

  const handleNavClick = (id: NavId) => {
    setActive(id);
    setOpen(false);
  };

  return (
    <nav className="w-full border-b px-4 py-2.5 md:px-8" id="home">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#home"
          className="group relative inline-flex items-center"
          onClick={() => handleNavClick("home")}
        >
          <div className="absolute -top-2 -left-2 h-4 w-4 border-t-2 border-l-2 duration-200 group-hover:-top-1 group-hover:-left-1" />
          <Logo className="w-14" hover />
          <div className="absolute -right-2 -bottom-2 h-4 w-4 border-r-2 border-b-2 duration-200 group-hover:-right-1 group-hover:-bottom-1" />
        </a>

        {/* Desktop Nav */}
        <div className="bg-background/50 font-incognito relative hidden items-center backdrop-blur-sm md:flex">
          {/* Overlay layer  */}
          <div
            ref={overlayRef}
            className="pointer-events-none absolute inset-1.5 z-10 w-full overflow-hidden rounded-full [clip-path:inset(0px_75%_0px_0%_round_17px)] [transition:clip-path_0.25s_ease]"
          >
            <div className="bg-foreground/10 relative flex gap-1 rounded-full border px-2 py-1">
              {NAV_LINKS.map((x) => (
                <div
                  key={x.id}
                  className="text-foreground flex items-center rounded-full px-4 py-1.5 text-sm font-medium opacity-0"
                >
                  {x.label}
                </div>
              ))}
            </div>
          </div>

          {/* Clickable layer */}
          <div className="relative z-20 flex items-center gap-1 rounded-full border px-4 py-1.5">
            {NAV_LINKS.map((x) => {
              const isActive = x.id === active;
              return (
                <a
                  key={x.id}
                  ref={isActive ? activeTabRef : null}
                  href={`#${x.id}`}
                  onClick={() => handleNavClick(x.id)}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                    isActive ? "" : "opacity-70 hover:opacity-100",
                  )}
                >
                  {x.label}
                </a>
              );
            })}
          </div>
        </div>

        {/* Right Actions */}
        <div className="inline-flex items-center gap-3">
          <div className="bg-background/50 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 backdrop-blur-sm">
            {/* GitHub */}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noreferrer noopener"
              className="text-foreground/60 hover:text-foreground text-sm transition-colors duration-200 hover:scale-110"
              aria-label="GitHub"
            >
              <svg viewBox="0 0 24 24" className="size-5">
                <path
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                  fill="currentColor"
                />
              </svg>
            </a>

            <div className="bg-border h-4 w-px" />

            {/* Sound Toggle */}
            <button
              onClick={() => toggleSoundEnabled()}
              className="text-foreground/60 hover:text-foreground transition-all duration-200 hover:scale-110"
              aria-label={isSoundEnabled ? "Mute sounds" : "Enable sounds"}
            >
              {isSoundEnabled ? (
                <Volume2Icon className="size-5" />
              ) : (
                <VolumeXIcon className="size-5" />
              )}
            </button>

            <div className="bg-border h-4 w-px" />

            {/* Theme Toggle */}
            <button
              onClick={() =>
                setTheme(resolvedTheme === "dark" ? "light" : "dark")
              }
              className="transition-transform duration-200 hover:scale-110"
              aria-label="Toggle theme"
            >
              <ThemeToggleButton2 className="size-5" theme={resolvedTheme} />
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            className="hover:bg-foreground/5 inline-flex size-9 items-center justify-center rounded-md border transition-colors md:hidden"
            onClick={() => setOpen((s) => !s)}
            aria-label="Toggle menu"
          >
            <AnimatePresence mode="wait" initial={false}>
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <XIcon className="size-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MenuIcon className="size-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden md:hidden"
          >
            <motion.div
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
              className="bg-background/50 mt-2 grid gap-1 rounded-xl border p-2 backdrop-blur-sm"
            >
              {NAV_LINKS.map((x, index) => (
                <motion.a
                  key={x.id}
                  href={`#${x.id}`}
                  onClick={() => handleNavClick(x.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={cn(
                    "group font-incognito relative overflow-hidden rounded-lg px-4 py-3 text-sm transition-all duration-200",
                    x.id === active
                      ? "bg-foreground/10 font-semibold shadow-sm"
                      : "hover:bg-foreground/5 opacity-80 hover:opacity-100",
                  )}
                >
                  {/* Active indicator */}
                  {x.id === active && (
                    <motion.div
                      layoutId="mobile-nav-indicator"
                      className="bg-foreground absolute top-0 bottom-0 left-0 w-1 rounded-r-full"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  {/* Hover gradient effect */}
                  <div className="from-foreground/0 via-foreground/5 to-foreground/0 absolute inset-0 translate-x-[-100%] bg-gradient-to-r transition-transform duration-700 ease-in-out group-hover:translate-x-[100%]" />

                  <div className="relative flex items-center justify-between">
                    <span>{x.label}</span>
                    {x.id === active && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="bg-foreground/50 size-2 rounded-full"
                      />
                    )}
                  </div>
                </motion.a>
              ))}

              <div className="bg-border my-1 h-px" />

              <div className="grid grid-cols-3 gap-2 px-2 py-1">
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="hover:bg-foreground/5 group flex flex-col items-center gap-1.5 rounded-lg py-2 transition-colors"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="text-foreground/60 group-hover:text-foreground size-5 transition-colors"
                  >
                    <path
                      d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="text-foreground/60 group-hover:text-foreground text-[10px] font-medium">
                    GitHub
                  </span>
                </a>

                <button
                  onClick={() => toggleSoundEnabled()}
                  className="hover:bg-foreground/5 group flex flex-col items-center gap-1.5 rounded-lg py-2 transition-colors"
                >
                  {isSoundEnabled ? (
                    <Volume2Icon className="text-foreground/60 group-hover:text-foreground size-5 transition-colors" />
                  ) : (
                    <VolumeXIcon className="text-foreground/60 group-hover:text-foreground size-5 transition-colors" />
                  )}
                  <span className="text-foreground/60 group-hover:text-foreground text-[10px] font-medium">
                    {isSoundEnabled ? "Sound" : "Muted"}
                  </span>
                </button>

                <button
                  onClick={() =>
                    setTheme(resolvedTheme === "dark" ? "light" : "dark")
                  }
                  className="hover:bg-foreground/5 group flex flex-col items-center gap-1.5 rounded-lg py-2 transition-colors"
                >
                  <ThemeToggleButton2
                    className="text-foreground/60 group-hover:text-foreground size-5"
                    theme={resolvedTheme}
                  />
                  <span className="text-foreground/60 group-hover:text-foreground text-[10px] font-medium">
                    Theme
                  </span>
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
