"use client";

import { useState, useRef, RefObject } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useQuery } from "@tanstack/react-query";

import {
  Star,
  Users,
  GitPullRequest,
  GitCommit,
  Package,
  Flame,
  BarChart3,
  CalendarDays,
  TrendingUp,
  ArrowUpRight,
  Code2,
  Activity,
  Zap,
  Award,
  Target,
  Loader2,
  AlertCircle,
  Layers,
} from "lucide-react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

import useDetectBrowser from "@/hooks/use-detect-browser";
import useScreenSize from "@/hooks/use-screen-size";
import GooeySvgFilter from "@/components/ui/geogy-svg-filter";
import { cn } from "@/lib/utils";
import { Robot } from "@/components/ui/robot";
import type { GitHubStatsResponse } from "@/types/github";
import GitHubCalendar from "react-github-calendar";
import env from "@/config/env";
import SectionHeading from "@/components/section-heading";
import { Eyes } from "@/components/ui/robot-eyes";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Marquee } from "@/components/ui/marquee";
import { clientApi } from "@/lib/client-api";
import { BackgroundGridAnimated } from "@/components/shared/backgrounds";
import { useTheme } from "next-themes";
import dayjs from "dayjs";

const GITHUB_JOIN_YEAR = 2023;

const TAB_CONTENT = [
  { title: "Overview", icon: BarChart3 },
  { title: "Activity", icon: Activity },
  { title: "Insights", icon: TrendingUp },
];

const TECH_STACK = {
  Frontend: [
    { name: "React", icon: "/icons/react.svg" },
    { name: "Next.js", icon: "/icons/nextjs.svg" },
    { name: "TypeScript", icon: "/icons/typescript.svg" },
    { name: "HTML", icon: "/icons/html.svg" },
    { name: "CSS", icon: "/icons/css.svg" },
    { name: "Tailwind", icon: "/icons/tailwind.svg" },
  ],
  Backend: [
    { name: "Node.js", icon: "/icons/nodejs.svg" },
    { name: "Bun", icon: "/icons/bunjs.svg" },
    { name: "Python", icon: "/icons/python.svg" },
    { name: "MongoDB", icon: "/icons/mongodb.svg" },
    { name: "Prisma", icon: "/icons/prisma.svg" },
  ],
  Tools: [
    { name: "Git", icon: "/icons/git.svg" },
    { name: "VS Code", icon: "/icons/vscode.svg" },
    { name: "Figma", icon: "/icons/figma.svg" },
    { name: "Notion", icon: "/icons/notion.svg" },
  ],
};

const TechStackCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
      className="bg-muted/30 relative rounded-xl border-2 p-6"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-wide">Tech Stack</h3>
        <div className="bg-muted/30 rounded-lg border p-2 backdrop-blur-sm">
          <Layers className="text-muted-foreground h-4 w-4" />
        </div>
      </div>

      {/*  Categories */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(TECH_STACK).map(([category, techs]) => (
          <div key={category} className="space-y-3">
            {/*  Label */}
            <div className="relative flex items-center justify-center">
              <div className="via-primary/40 h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
              <span className="text-muted-foreground px-2 text-xs font-medium tracking-widest uppercase">
                {category}
              </span>
              <div className="via-primary/40 h-px flex-1 bg-gradient-to-r from-transparent to-transparent" />
            </div>

            {/* Marquee */}
            <div className="relative overflow-hidden rounded-xl border border-dashed">
              <div className="from-card pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r via-transparent to-transparent" />
              <div className="from-card pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l via-transparent to-transparent" />

              <Marquee pauseOnHover>
                {techs.map((tech) => (
                  <div
                    key={tech.name}
                    className="group relative flex h-14 w-14 items-center justify-center rounded-md transition-transform duration-300 hover:scale-110"
                    aria-label={tech.name}
                  >
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="size-10 object-contain opacity-70 grayscale-100 transition-all duration-300 group-hover:opacity-100 group-hover:drop-shadow-lg group-hover:grayscale-0"
                    />
                    <span className="absolute bottom-1 translate-y-4 rounded bg-black/50 px-1 text-[10px] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      {tech.name}
                    </span>
                  </div>
                ))}
              </Marquee>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const RobotWithEyes = ({ className }: { className?: string }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className={cn("relative", className)}>
      <Robot>
        <div
          className="flex h-full w-full items-center justify-center gap-8 bg-neutral-950"
          ref={containerRef}
        >
          <Eyes
            mouseFollow={{
              enabled: true,
              containerRef: containerRef as RefObject<HTMLDivElement>,
              maxX: 20,
              maxY: 15,
              stiffness: 100,
            }}
            glow={{
              color: "green",
              level: 5,
            }}
            size="xl"
          />
        </div>
      </Robot>
    </div>
  );
};

const OverviewContent = ({ data }: { data?: GitHubStatsResponse }) => {
  const overviewStats = [
    {
      label: "Repositories",
      value: data?.totalRepositories ?? 0,
      icon: Package,
      trend: data?.weeklyTrends?.repositories?.value ?? 0,
    },
    {
      label: "Stars",
      value: data?.totalStars ?? 0,
      icon: Star,
      trend: data?.weeklyTrends.stars.value ?? 0,
    },
    {
      label: "Contributions",
      value: data?.contributions ?? 0,
      icon: GitCommit,
      trend: data?.weeklyTrends?.contributions?.value ?? 0,
    },
    {
      label: "Pull Requests",
      value: data?.pullRequests?.total ?? 0,
      icon: GitPullRequest,
      trend: data?.weeklyTrends?.pullRequests?.value ?? 0,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Stats Cards */}
        <div className="space-y-4">
          {overviewStats.slice(0, 2).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group bg-muted/30 relative overflow-hidden rounded-xl border-2 p-5 transition-all"
            >
              <BackgroundGridAnimated />

              <div className="relative z-10">
                <div className="mb-3 flex items-start justify-between">
                  <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                    {stat.label}
                  </p>
                  <div className="bg-muted rounded-lg border-2 p-2">
                    <stat.icon className="text-muted-foreground h-4 w-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">
                    <NumberTicker value={stat.value} delay={index * 0.1} />
                  </p>
                  <span className="flex items-center text-xs font-medium text-green-400">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.trend}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/*  Robot */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-muted/30 relative overflow-hidden rounded-xl border p-4 max-md:hidden"
        >
          <RobotWithEyes className="absolute top-2/3 left-1/2 w-92 -translate-1/2" />
        </motion.div>

        {/*  Stats Cards */}
        <div className="space-y-4">
          {overviewStats.slice(2, 4).map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index + 2) * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group bg-muted/30 relative overflow-hidden rounded-xl border-2 p-5"
            >
              <BackgroundGridAnimated />

              <div className="relative z-10">
                <div className="mb-3 flex items-start justify-between">
                  <p className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
                    {stat.label}
                  </p>
                  <div className="bg-muted rounded-lg border-2 p-2">
                    <stat.icon className="text-muted-foreground h-4 w-4" />
                  </div>
                </div>

                <div className="flex items-baseline gap-2">
                  <p className="text-2xl font-bold">
                    <NumberTicker
                      value={stat.value}
                      delay={(index + 2) * 0.1}
                    />
                  </p>
                  <span className="flex items-center text-xs font-medium text-green-400">
                    <ArrowUpRight className="h-3 w-3" />
                    {stat.trend}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Followers Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          className="group bg-muted/30 relative overflow-hidden rounded-xl border-2 p-5"
        >
          <BackgroundGridAnimated />

          <div className="relative z-10">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold">Community</h3>

              <div className="bg-muted rounded-lg border-2 p-2">
                <Users className="text-muted-foreground h-4 w-4" />
              </div>
            </div>

            <div className="text-3xl font-bold">
              <NumberTicker
                value={data?.followers?.totalCount ?? 0}
                delay={0.5}
              />
            </div>
            <p className="text-muted-foreground text-xs">followers</p>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex -space-x-2">
                {data?.followers.nodes.slice(0, 5).map((follower, i) => (
                  <motion.img
                    key={follower.login}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    src={follower.avatarUrl}
                    alt={follower.login}
                    className="h-8 w-8 rounded-full border-2"
                  />
                ))}
              </div>
              {(data?.followers?.nodes?.length ?? 0) > 5 && (
                <span className="text-muted-foreground text-xs">
                  +{(data?.followers?.nodes?.length ?? 0) - 5} more
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* Language Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.02 }}
          className="group bg-muted/30 relative overflow-hidden rounded-xl border-2 p-5"
        >
          <BackgroundGridAnimated />

          <div className="relative z-10">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold">Languages</h3>

              <div className="bg-muted rounded-lg border-2 p-2">
                <Code2 className="text-muted-foreground h-4 w-4" />
              </div>
            </div>

            <div className="space-y-3">
              {(data?.topLanguages?.length ?? 0) > 0 ? (
                data?.topLanguages?.map((lang, i) => (
                  <div key={lang.name} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-sm">{lang.name}</span>
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {lang.percentage}%
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percentage}%` }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                        className="h-1.5 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">
                  No language data available
                </p>
              )}
            </div>
          </div>
        </motion.div>
      </div>

      <TechStackCard />
    </div>
  );
};

const ActivityContent = ({ data }: { data?: GitHubStatsResponse }) => {
  const currentYear = dayjs().year();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const { resolvedTheme } = useTheme();

  const years = Array.from(
    { length: currentYear - GITHUB_JOIN_YEAR + 1 },
    (_, i) => GITHUB_JOIN_YEAR + i,
  ).reverse();

  const contributionData =
    data?.contributionsCollection.contributionCalendar.weeks
      .flatMap((week) => week.contributionDays)
      .slice(-30)
      .map((day, index) => ({
        day: index + 1,
        commits: day.contributionCount,
        date: day.date,
      }));

  return (
    <div className="space-y-6">
      {/* GitHub Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-muted/30 rounded-xl border-2 p-5"
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Contribution Calendar</h3>
            <div className="flex items-center gap-2">
              <CalendarDays className="text-muted-foreground h-4 w-4" />
              <span className="text-muted-foreground text-xs">
                <NumberTicker
                  value={
                    data?.contributionsCollection?.contributionCalendar
                      ?.totalContributions ?? 0
                  }
                  delay={0.1}
                />{" "}
                contributions
              </span>
            </div>
          </div>

          {/* Year Selector */}
          <div className="flex gap-2">
            {years.map((year) => (
              <motion.button
                key={year}
                onClick={() => setSelectedYear(year)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={cn(
                  "rounded-lg border-2 px-3 py-1 text-xs font-medium transition-all",
                  selectedYear === year
                    ? "border-green-400 bg-green-400/10 text-green-400"
                    : "bg-muted text-muted-foreground hover:border-neutral-600",
                )}
              >
                {year}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-fit max-w-fit">
            <GitHubCalendar
              username={env.NEXT_PUBLIC_GITHUB_USERNAME}
              colorScheme={(resolvedTheme as "light" | "dark") ?? "dark"}
              blockSize={13}
              year={selectedYear}
            />
          </div>
        </div>
      </motion.div>

      {/* Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-muted/30 overflow-x-auto rounded-xl border-2 p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-semibold">Activity Trend (Last 30 Days)</h3>
          <div className="flex items-center gap-2 rounded-full bg-green-400/10 px-3 py-1">
            <Zap className="h-3 w-3 text-green-400" />
            <span className="text-xs font-medium text-green-400">
              {(data?.currentStreak ?? 0) > 0 ? "Active" : "Inactive"}
            </span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={contributionData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#262626"
              opacity={0.2}
            />
            <XAxis dataKey="day" stroke="#525252" fontSize={10} />
            <YAxis stroke="#525252" fontSize={10} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0a0a0a",
                border: "1px solid #262626",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              labelFormatter={(value) => `Day ${value}`}
            />
            <Area
              type="monotone"
              dataKey="commits"
              stroke="#4ade80"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
};

const InsightsContent = ({ data }: { data?: GitHubStatsResponse }) => {
  const streakData = [
    {
      label: "Current Streak",
      value: data?.currentStreak ?? 0,
      unit: "days",
      icon: Flame,
    },
    {
      label: "Longest Streak",
      value: data?.longestStreak ?? 0,
      unit: "days",
      icon: Award,
    },
    {
      label: "Best Day",
      value: data?.highestCommitDay.count ?? 0,
      unit: "commits",
      icon: Target,
    },
  ];

  const totalRepos = data?.repositories.total || 1;
  const originalPercentage = Math.round(
    ((data?.repositories.original ?? 0) / totalRepos) * 100,
  );
  const forkedPercentage = Math.round(
    ((data?.repositories.forked ?? 0) / totalRepos) * 100,
  );

  const repoBreakdown = [
    { label: "Original", value: originalPercentage, color: "#3b82f6" },
    { label: "Forked", value: forkedPercentage, color: "#22c55e" },
  ];

  const prClosedPercentage = data?.pullRequests.total
    ? Math.round(
        ((data.pullRequests.closed + data.pullRequests.merged) /
          data.pullRequests.total) *
          100,
      )
    : 0;

  const issuesClosedPercentage = data?.issues.total
    ? Math.round((data.issues.closed / data.issues.total) * 100)
    : 0;

  const activityMetrics = [
    {
      label: "Pull Requests",
      closed: prClosedPercentage,
      total: data?.pullRequests.total ?? 0,
      color: "#22c55e",
      breakdown: `${data?.pullRequests.merged ?? 0} merged, ${data?.pullRequests.closed ?? 0} closed`,
    },
    {
      label: "Issues",
      closed: issuesClosedPercentage,
      total: data?.issues.total ?? 0,
      color: "#f43f5e",
      breakdown: `${data?.issues.open} open, ${data?.issues.closed} closed`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Streak Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        {streakData.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="group bg-muted/30 relative overflow-hidden rounded-xl border-2 p-4"
          >
            <BackgroundGridAnimated />

            <div className="relative z-10">
              <div className="bg-muted absolute top-2 right-2 rounded-lg border-2 p-2">
                <item.icon className="text-muted-foreground h-4 w-4" />
              </div>

              <div className="mt-8">
                <p className="text-muted-foreground text-xs font-medium">
                  {item.label}
                </p>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-2xl font-bold">
                    <NumberTicker value={item.value} delay={i * 0.1} />
                  </span>
                  <span className="text-muted-foreground text-sm">
                    {item.unit}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-muted/30 rounded-xl border-2 p-5"
        >
          <h3 className="mb-4 font-semibold">Repository Breakdown</h3>
          <div className="text-muted-foreground mb-4 text-xs">
            Total:{" "}
            <NumberTicker value={data?.repositories.total ?? 0} delay={0.2} />{" "}
            repositories
          </div>
          <div className="space-y-3">
            {repoBreakdown.map((item, i) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-2 text-sm">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-muted-foreground">{item.label}</span>
                  </span>
                  <span className="text-muted-foreground text-xs font-medium">
                    <NumberTicker value={item.value} delay={0.3 + i * 0.1} />% (
                    <NumberTicker
                      value={
                        item.label === "Original"
                          ? (data?.repositories.original ?? 0)
                          : (data?.repositories.forked ?? 0)
                      }
                      delay={0.3 + i * 0.1}
                    />
                    )
                  </span>
                </div>
                <div className="bg-muted h-2 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Activity Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-muted/30 rounded-xl border-2 p-5"
        >
          <h3 className="mb-4 font-semibold">Activity Metrics</h3>
          <div className="space-y-4">
            {activityMetrics.map((item, i) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-muted-foreground text-sm font-medium">
                    {item.label}
                  </span>
                  <span className="text-muted-foreground text-xs">
                    Total:{" "}
                    <NumberTicker value={item.total} delay={0.4 + i * 0.1} />
                  </span>
                </div>
                <div className="bg-muted h-2 rounded-full">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.closed}%` }}
                    transition={{ delay: i * 0.1, duration: 0.6 }}
                    className="h-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
                <div className="text-muted-foreground mt-1 text-xs">
                  {item.breakdown}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const LoadingState = () => (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="text-center">
      <Loader2 className="text-muted-foreground mx-auto h-8 w-8 animate-spin" />
      <p className="text-muted-foreground mt-4 text-sm">
        Loading GitHub stats...
      </p>
    </div>
  </div>
);

const ErrorState = ({ error }: { error: Error }) => (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="text-center">
      <AlertCircle className="mx-auto h-8 w-8 text-red-400" />
      <p className="mt-4 text-sm font-medium">Failed to load GitHub stats</p>
      <p className="text-muted-foreground mt-2 text-xs">{error.message}</p>
    </div>
  </div>
);

export default function Stats() {
  const [activeTab, setActiveTab] = useState(0);
  const screenSize = useScreenSize();
  const browserName = useDetectBrowser();
  const isSafari = browserName === "Safari";

  const {
    data: githubData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["github-stats"],
    queryFn: clientApi.github.getStats,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const renderTabContent = () => {
    if (isLoading) {
      return <LoadingState />;
    }

    if (error) {
      return <ErrorState error={error as Error} />;
    }

    if (!githubData) {
      return <ErrorState error={new Error("No data available")} />;
    }

    switch (activeTab) {
      case 0:
        return <OverviewContent data={githubData.data} />;
      case 1:
        return <ActivityContent data={githubData.data} />;
      case 2:
        return <InsightsContent data={githubData.data} />;
      default:
        return null;
    }
  };

  return (
    <SectionHeading className="px-4 py-12 md:px-8" id="stats" text="Stats">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] bg-[size:18px_18px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]" />
      </div>

      <div className="w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h2 className="font-incognito text-4xl font-semibold">
            GitHub Statistics
          </h2>
          <p className="text-muted-foreground mt-2">
            Tracking my open source journey
          </p>
        </motion.div>

        {/*  Tabs */}
        <div className="relative flex justify-center text-xs sm:text-sm md:text-base">
          <GooeySvgFilter
            id="gooey-filter"
            strength={screenSize.lessThan("md") ? 8 : 15}
          />

          <div className="no-scrollbar relative h-screen w-full overflow-y-auto">
            <div
              className="absolute inset-0"
              style={{ filter: "url(#gooey-filter)" }}
            >
              <div className="flex w-full">
                {TAB_CONTENT.map((_, index) => (
                  <div key={index} className="relative h-10 flex-1 md:h-12">
                    {activeTab === index && (
                      <motion.div
                        layoutId="active-tab"
                        className="bg-card absolute inset-0 rounded-t-xl"
                        transition={{
                          type: "spring",
                          bounce: 0.0,
                          duration: isSafari ? 0 : 0.4,
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Content panel */}
              <div className="bg-card w-full rounded-b-xl p-6 md:p-8">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={activeTab}
                    initial={{
                      opacity: 0,
                      y: 30,
                      filter: "blur(10px)",
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                      filter: "blur(0px)",
                    }}
                    exit={{
                      opacity: 0,
                      y: -30,
                      filter: "blur(10px)",
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut",
                    }}
                  >
                    {renderTabContent()}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/*  text overlay */}
            <div className="relative flex w-full">
              {TAB_CONTENT.map((tab, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className="group h-10 flex-1 transition-all md:h-12"
                >
                  <span
                    className={cn(
                      "flex h-full w-full items-center justify-center gap-2 font-medium transition-all",
                      {
                        "text-foreground": activeTab === index,
                        "text-muted-foreground": activeTab !== index,
                      },
                    )}
                  >
                    <tab.icon
                      className={cn(
                        "h-4 w-4 transition-transform",
                        activeTab === index && "scale-110",
                      )}
                    />
                    {tab.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionHeading>
  );
}
