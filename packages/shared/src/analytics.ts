import type {
  ActivityDay,
  AppSeed,
  AttendanceEntry,
  ChartPoint,
  DailyLog,
  DashboardMetrics,
  DashboardOverview,
  Domain,
  LearningTopic,
  MemberSummary,
  User
} from "./types.js";
const unique = <T,>(items: T[]) => Array.from(new Set(items));

const dateKey = (value: string) => new Date(value).toISOString().slice(0, 10);

const lastNDays = (days: number) =>
  Array.from({ length: days }, (_, index) => {
    const value = new Date();
    value.setDate(value.getDate() - (days - index - 1));
    return value.toISOString().slice(0, 10);
  });

export const calculateAttendancePercentage = (entries: AttendanceEntry[], userId: string) => {
  const userEntries = entries.filter((entry) => entry.userId === userId);
  if (userEntries.length === 0) {
    return 0;
  }

  const presentLike = userEntries.filter((entry) => entry.status === "Present" || entry.status === "Late").length;
  return Math.round((presentLike / userEntries.length) * 100);
};

export const calculateStreak = (logs: DailyLog[], userId: string) => {
  const days = unique(logs.filter((log) => log.userId === userId).map((log) => dateKey(log.date))).sort().reverse();
  let streak = 0;
  let cursor = new Date();

  for (const day of days) {
    const expected = cursor.toISOString().slice(0, 10);
    if (day === expected) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
      continue;
    }

    if (streak === 0) {
      cursor.setDate(cursor.getDate() - 1);
      if (day === cursor.toISOString().slice(0, 10)) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      }
    }
  }

  return streak;
};

export const computeProductivityScore = (logs: DailyLog[], learningTopics: LearningTopic[], userId: string) => {
  const userLogs = logs.filter((log) => log.userId === userId);
  const totalHours = userLogs.reduce((sum, log) => sum + log.hoursWorked, 0);
  const completedLogs = userLogs.filter((log) => log.status === "Completed").length;
  const approvedLogs = userLogs.filter((log) => log.approvalStatus === "approved").length;
  const completedTopics = learningTopics.filter((topic) => topic.userId === userId && topic.status === "completed").length;
  const score = totalHours * 4 + completedLogs * 10 + approvedLogs * 6 + completedTopics * 8;

  return Math.max(0, Math.min(100, Math.round(score)));
};

export const computeFundamentalsScore = (learningTopics: LearningTopic[], userId: string) => {
  const topics = learningTopics.filter((topic) => topic.userId === userId);
  if (topics.length === 0) {
    return 0;
  }

  const completed = topics.filter((topic) => topic.status === "completed").length;
  const revised = topics.filter((topic) => topic.revisionComplete).length;
  return Math.round(((completed * 0.6 + revised * 0.4) / topics.length) * 100);
};

export const buildWeeklyProductivity = (logs: DailyLog[], userId: string): ChartPoint[] => {
  return lastNDays(7).map((date) => {
    const total = logs
      .filter((log) => log.userId === userId && dateKey(log.date) === date)
      .reduce((sum, log) => sum + log.hoursWorked, 0);

    return {
      label: date.slice(5),
      value: Number(total.toFixed(1))
    };
  });
};

export const buildActivityCalendar = (
  logs: DailyLog[],
  attendance: AttendanceEntry[],
  userId: string
): ActivityDay[] => {
  return lastNDays(30).map((date) => {
    const log = logs.find((entry) => entry.userId === userId && dateKey(entry.date) === date);
    const attendanceItem = attendance.find((entry) => entry.userId === userId && dateKey(entry.date) === date);
    const intensity = Math.min(4, Math.round((log?.hoursWorked ?? 0) / 1.5));

    return {
      date,
      intensity,
      submitted: Boolean(log),
      attended: attendanceItem?.status ?? null
    };
  });
};

export const summarizeMember = (
  user: User,
  logs: DailyLog[],
  attendance: AttendanceEntry[],
  learningTopics: LearningTopic[]
): MemberSummary => {
  const userLogs = logs.filter((log) => log.userId === user.id);
  const skills = unique(learningTopics.filter((topic) => topic.userId === user.id).flatMap((topic) => topic.skillTags));

  return {
    id: user.id,
    name: user.name,
    role: user.role,
    domain: user.domain,
    year: user.year,
    batch: user.batch,
    teamRole: user.teamRole,
    avatarUrl: user.avatarUrl,
    status: user.status,
    attendancePercentage: calculateAttendancePercentage(attendance, user.id),
    totalDailyEntries: userLogs.length,
    topicsCompleted: learningTopics.filter((topic) => topic.userId === user.id && topic.status === "completed").length,
    skillsLearned: skills,
    productivityScore: computeProductivityScore(logs, learningTopics, user.id),
    streakCount: calculateStreak(logs, user.id),
    fundamentalsScore: computeFundamentalsScore(learningTopics, user.id)
  };
};

export const buildLeaderboard = (seed: AppSeed) =>
  seed.users
    .map((user) => summarizeMember(user, seed.logs, seed.attendance, seed.learningTopics))
    .sort((a, b) => b.productivityScore - a.productivityScore);

export const buildDomainProgress = (seed: AppSeed) => {
  const domains = unique(seed.users.map((user) => user.domain));

  return domains.map((domain) => {
    const members = seed.users.filter((user) => user.domain === domain);
    const topics = seed.learningTopics.filter((topic) => topic.domain === domain);
    const completed = topics.filter((topic) => topic.status === "completed").length;

    return {
      domain: domain as Domain,
      completion: topics.length ? Math.round((completed / topics.length) * 100) : 0,
      members: members.length
    };
  });
};

export const buildAttendanceTrend = (seed: AppSeed): ChartPoint[] => {
  return lastNDays(7).map((date) => {
    const dailyEntries = seed.attendance.filter((entry) => dateKey(entry.date) === date);
    const presentLike = dailyEntries.filter((entry) => entry.status === "Present" || entry.status === "Late").length;
    const rate = dailyEntries.length ? Math.round((presentLike / dailyEntries.length) * 100) : 0;

    return {
      label: date.slice(5),
      value: rate
    };
  });
};

export const buildProductivityTrend = (seed: AppSeed): ChartPoint[] => {
  return lastNDays(7).map((date) => {
    const totalHours = seed.logs.filter((log) => dateKey(log.date) === date).reduce((sum, log) => sum + log.hoursWorked, 0);

    return {
      label: date.slice(5),
      value: Number(totalHours.toFixed(1))
    };
  });
};

export const buildDashboardMetrics = (seed: AppSeed): DashboardMetrics => {
  const today = new Date().toISOString().slice(0, 10);
  const summaries = seed.users.map((user) => summarizeMember(user, seed.logs, seed.attendance, seed.learningTopics));
  const pendingApprovals = seed.logs.filter((log) => log.approvalStatus === "pending-review").length;
  const submissionsToday = seed.logs.filter((log) => dateKey(log.date) === today).length;
  const noSubmissionToday = seed.users
    .filter((user) => !seed.logs.some((log) => log.userId === user.id && dateKey(log.date) === today))
    .map((user) => user.name);

  return {
    activeMembers: seed.users.filter((user) => user.status === "active").length,
    inactiveMembers: seed.users.filter((user) => user.status === "inactive").length,
    attendanceRate: Math.round(
      summaries.reduce((sum, summary) => sum + summary.attendancePercentage, 0) / Math.max(summaries.length, 1)
    ),
    submissionsToday,
    pendingApprovals,
    averageProductivity: Math.round(
      summaries.reduce((sum, summary) => sum + summary.productivityScore, 0) / Math.max(summaries.length, 1)
    ),
    noSubmissionToday
  };
};

export const generateWeeklySummary = (seed: AppSeed, userId?: string) => {
  const scopedLogs = userId ? seed.logs.filter((log) => log.userId === userId) : seed.logs;
  const totalHours = scopedLogs.reduce((sum, log) => sum + log.hoursWorked, 0).toFixed(1);
  const completed = scopedLogs.filter((log) => log.status === "Completed").length;
  const blockers = unique(scopedLogs.flatMap((log) => log.problemsFaced)).slice(0, 3);
  const highlight = buildLeaderboard(seed)[0];

  return `This week logged ${totalHours} focused engineering hours across ${completed} completed updates. Key blockers were ${blockers.join(
    ", "
  )}. The strongest current momentum belongs to ${highlight?.name ?? "the team"} with a productivity score of ${
    highlight?.productivityScore ?? 0
  }.`;
};

export const buildDashboardOverview = (seed: AppSeed): DashboardOverview => ({
  metrics: buildDashboardMetrics(seed),
  leaderboard: buildLeaderboard(seed),
  domainProgress: buildDomainProgress(seed),
  attendanceTrend: buildAttendanceTrend(seed),
  productivityTrend: buildProductivityTrend(seed),
  recentLogs: [...seed.logs]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5)
    .map((log) => {
      const user = seed.users.find((candidate) => candidate.id === log.userId)!;
      return {
        ...log,
        memberName: user.name,
        domain: user.domain
      };
    }),
  announcements: seed.notifications
});
