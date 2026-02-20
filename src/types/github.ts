export type ContributionDay = {
  color: string;
  contributionCount: number;
  date: string;
}

export type Week = {
  contributionDays: ContributionDay[];
  firstDay: string;
}

export type Month = {
  firstDay: string;
  name: string;
  totalWeeks: number;
}

export type ContributionCalendar = {
  colors: string[];
  totalContributions: number;
  months: Month[];
  weeks: Week[];
}

export type ContributionsCollection = {
  contributionCalendar: ContributionCalendar;
}

export type Follower = {
  login: string;
  avatarUrl: string;
  url: string;
}

export type Language = {
  name: string;
  color: string;
  percentage: number;
}

// New: Trend type
export type Trend = {
  value: number;
  percentage: number;
  isPositive: boolean;
}

export type GitHubStatsResponse = {
  contributionsCollection: ContributionsCollection;
  totalRepositories: number;
  totalStars: number;
  followers: {
    totalCount: number;
    nodes: Follower[];
  };
  topLanguages: Language[];
  contributions: number;
  pullRequests: {
    total: number;
    open: number;
    closed: number;
    merged: number;
  };
  issues: {
    total: number;
    open: number;
    closed: number;
  };
  currentStreak: number;
  longestStreak: number;
  highestCommitDay: {
    date: string;
    count: number;
  };
  repositories: {
    total: number;
    original: number;
    forked: number;
  };
  // New: Weekly trends
  weeklyTrends: {
    repositories: Trend;
    stars: Trend;
    contributions: Trend;
    pullRequests: Trend;
  };
}