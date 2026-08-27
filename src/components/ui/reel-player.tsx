"use client";

import { cn } from "@/lib/utils";
import {
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
} from "lucide-react";
import React, { useCallback, useEffect, useRef, useState } from "react";

const formatTime = (seconds: number) => {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
};

const CONTROLS_IDLE_MS = 2600;
const SEEK_STEP = 5;

type ReelPlayerProps = {
  src: string;
  poster: string;
  title: string;
  /** Known duration in seconds, so the readout is right before metadata lands. */
  fallbackDuration?: number;
  /** CSS aspect-ratio of the source, keeps the frame from cropping the UI. */
  aspectRatio?: string;
  className?: string;
};

const ReelPlayer = ({
  src,
  poster,
  title,
  fallbackDuration = 0,
  aspectRatio = "1440 / 724",
  className,
}: ReelPlayerProps) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const idleTimer = useRef<number | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [idle, setIdle] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(fallbackDuration);
  const [buffered, setBuffered] = useState(0);

  // Paused / scrubbing always shows the bar; while playing it fades after a beat.
  const showControls = !isPlaying || isScrubbing || !idle;

  const wakeControls = useCallback(() => {
    setIdle(false);
    if (idleTimer.current) window.clearTimeout(idleTimer.current);
    idleTimer.current = window.setTimeout(() => setIdle(true), CONTROLS_IDLE_MS);
  }, []);

  useEffect(() => {
    return () => {
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, []);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      void video.play().catch(() => setIsPlaying(false));
    } else {
      video.pause();
    }
    wakeControls();
  }, [wakeControls]);

  const toggleMute = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    wakeControls();
  }, [wakeControls]);

  const toggleFullscreen = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {});
    } else {
      void wrapper.requestFullscreen().catch(() => {});
    }
  }, []);

  const nudge = useCallback(
    (delta: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(video.duration)) return;
      video.currentTime = Math.min(
        video.duration,
        Math.max(0, video.currentTime + delta),
      );
      wakeControls();
    },
    [wakeControls],
  );

  // Track the real fullscreen state so the icon can't drift out of sync.
  useEffect(() => {
    const onChange = () =>
      setIsFullscreen(document.fullscreenElement === wrapperRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  // The page is a snap-scroll container, so a video scrolled past would otherwise
  // keep playing audio out of sight.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) videoRef.current?.pause();
      },
      { threshold: 0.3 },
    );
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const seekToClientX = useCallback((clientX: number) => {
    const track = trackRef.current;
    const video = videoRef.current;
    if (!track || !video || !Number.isFinite(video.duration)) return;

    const rect = track.getBoundingClientRect();
    if (rect.width === 0) return;

    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width));
    const next = ratio * video.duration;
    video.currentTime = next;
    setCurrent(next);
  }, []);

  const handleTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsScrubbing(true);
    seekToClientX(e.clientX);
  };

  const handleTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isScrubbing) return;
    seekToClientX(e.clientX);
  };

  const handleTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsScrubbing(false);
  };

  // Scoped to the focused player so page scrolling is never hijacked.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case " ":
      case "k":
      case "K":
        e.preventDefault();
        togglePlay();
        break;
      case "ArrowLeft":
        e.preventDefault();
        nudge(-SEEK_STEP);
        break;
      case "ArrowRight":
        e.preventDefault();
        nudge(SEEK_STEP);
        break;
      case "m":
      case "M":
        e.preventDefault();
        toggleMute();
        break;
      case "f":
      case "F":
        e.preventDefault();
        toggleFullscreen();
        break;
      default:
        break;
    }
  };

  const handleProgress = () => {
    const video = videoRef.current;
    if (!video || video.buffered.length === 0) return;
    setBuffered(video.buffered.end(video.buffered.length - 1));
  };

  const playedPct = duration > 0 ? (current / duration) * 100 : 0;
  const bufferedPct = duration > 0 ? (buffered / duration) * 100 : 0;

  return (
    <div
      ref={wrapperRef}
      tabIndex={0}
      role="group"
      aria-label={`${title} — demo video player`}
      onKeyDown={handleKeyDown}
      onPointerMove={wakeControls}
      onFocus={wakeControls}
      className={cn(
        "group/player relative isolate outline-none",
        "focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        className,
      )}
    >
      {/* Frame corners — same treatment as the project cards */}
      <div className="border-foreground/20 pointer-events-none absolute -top-2 -left-2 z-20 h-8 w-8 border-t-2 border-l-2 transition-all group-hover/player:-top-3 group-hover/player:-left-3" />
      <div className="border-foreground/20 pointer-events-none absolute -top-2 -right-2 z-20 h-8 w-8 border-t-2 border-r-2 transition-all group-hover/player:-top-3 group-hover/player:-right-3" />
      <div className="border-foreground/20 pointer-events-none absolute -bottom-2 -left-2 z-20 h-8 w-8 border-b-2 border-l-2 transition-all group-hover/player:-bottom-3 group-hover/player:-left-3" />
      <div className="border-foreground/20 pointer-events-none absolute -right-2 -bottom-2 z-20 h-8 w-8 border-r-2 border-b-2 transition-all group-hover/player:-right-3 group-hover/player:-bottom-3" />

      <div
        className="bg-muted relative overflow-hidden border-2"
        style={{ aspectRatio }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          preload="metadata"
          playsInline
          title={title}
          className="h-full w-full cursor-pointer object-contain"
          onClick={togglePlay}
          onPlay={() => {
            setIsPlaying(true);
            setIsEnded(false);
            wakeControls();
          }}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            setIsEnded(true);
          }}
          onTimeUpdate={(e) => {
            if (isScrubbing) return;
            setCurrent(e.currentTarget.currentTime);
          }}
          onLoadedMetadata={(e) => {
            const d = e.currentTarget.duration;
            if (Number.isFinite(d)) setDuration(d);
          }}
          onVolumeChange={(e) => setIsMuted(e.currentTarget.muted)}
          onProgress={handleProgress}
        />

        {/* Keeps the control bar legible over bright UI screenshots */}
        <div
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0",
          )}
        />

        {/* Idle / ended overlay */}
        {!isPlaying && (
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isEnded ? `Replay ${title}` : `Play ${title}`}
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 transition-colors hover:bg-black/20 focus-visible:outline-none"
          >
            <span className="border-foreground/30 bg-background/70 text-foreground flex size-16 items-center justify-center rounded-full border-2 shadow-lg backdrop-blur-md transition-transform duration-300 group-hover/player:scale-110 md:size-20">
              {isEnded ? (
                <RotateCcw className="size-6 md:size-7" />
              ) : (
                <Play className="size-6 translate-x-0.5 md:size-7" />
              )}
            </span>
          </button>
        )}

        {/* Control bar */}
        <div
          className={cn(
            "absolute inset-x-0 bottom-0 z-20 transition-all duration-300",
            showControls
              ? "translate-y-0 opacity-100"
              : "pointer-events-none translate-y-full opacity-0",
          )}
        >
          {/* Scrub track */}
          <div
            ref={trackRef}
            role="slider"
            tabIndex={-1}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(current)}
            aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
            onPointerDown={handleTrackPointerDown}
            onPointerMove={handleTrackPointerMove}
            onPointerUp={handleTrackPointerUp}
            onPointerCancel={handleTrackPointerUp}
            className="group/track relative flex h-4 cursor-pointer touch-none items-end px-3"
          >
            <div className="bg-foreground/20 relative h-1 w-full transition-all group-hover/track:h-1.5">
              <div
                className="bg-foreground/25 absolute inset-y-0 left-0"
                style={{ width: `${bufferedPct}%` }}
              />
              <div
                className="bg-primary absolute inset-y-0 left-0"
                style={{ width: `${playedPct}%` }}
              />
              <div
                className={cn(
                  "bg-primary border-background pointer-events-none absolute top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-opacity",
                  isScrubbing
                    ? "opacity-100"
                    : "opacity-0 group-hover/track:opacity-100",
                )}
                style={{ left: `${playedPct}%` }}
              />
            </div>
          </div>

          <div className="bg-background/80 flex items-center gap-3 border-t px-3 py-2 backdrop-blur-md">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="hover:bg-foreground/10 focus-visible:ring-ring/50 flex size-7 shrink-0 items-center justify-center rounded transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {isPlaying ? (
                <Pause className="size-4" />
              ) : (
                <Play className="size-4" />
              )}
            </button>

            <span className="text-foreground/70 shrink-0 font-mono text-[11px] tabular-nums">
              {formatTime(current)}
              <span className="text-foreground/30"> / </span>
              {formatTime(duration)}
            </span>

            <span className="bg-border hidden h-4 w-px sm:block" />

            <span className="text-foreground/30 mr-auto hidden truncate font-mono text-[10px] tracking-widest uppercase sm:block">
              {title}
            </span>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={isMuted ? "Unmute" : "Mute"}
              className="hover:bg-foreground/10 focus-visible:ring-ring/50 flex size-7 shrink-0 items-center justify-center rounded transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {isMuted ? (
                <VolumeX className="size-4" />
              ) : (
                <Volume2 className="size-4" />
              )}
            </button>

            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              className="hover:bg-foreground/10 focus-visible:ring-ring/50 flex size-7 shrink-0 items-center justify-center rounded transition-colors focus-visible:ring-2 focus-visible:outline-none"
            >
              {isFullscreen ? (
                <Minimize className="size-4" />
              ) : (
                <Maximize className="size-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelPlayer;
