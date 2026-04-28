import {
  appSeed,
  buildActivityCalendar,
  buildDashboardOverview,
  buildLeaderboard,
  buildWeeklyProductivity,
  generateWeeklySummary,
  summarizeMember
} from "@aerodesign/shared";
import type {
  ActivityDay,
  AttendanceEntry,
  ChartPoint,
  DailyLog,
  DashboardOverview,
  LearningTopic,
  MemberSummary,
  NotificationItem,
  User
} from "@aerodesign/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

interface MemberProfileResponse {
  user: User;
  summary: MemberSummary;
  weeklyProductivity: ChartPoint[];
  activityCalendar: ActivityDay[];
  logs: DailyLog[];
  attendance: AttendanceEntry[];
  learningTopics: LearningTopic[];
  weeklySummary: string;
}

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_URL}${path}`, {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`Request failed for ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function getDashboardOverview(): Promise<DashboardOverview> {
  try {
    return await request<DashboardOverview>("/dashboard");
  } catch {
    return buildDashboardOverview(appSeed);
  }
}

export async function getMembers() {
  try {
    return await request<MemberSummary[]>("/members");
  } catch {
    return appSeed.users.map((user) => summarizeMember(user, appSeed.logs, appSeed.attendance, appSeed.learningTopics));
  }
}

export async function getMemberProfile(memberId: string): Promise<MemberProfileResponse> {
  try {
    return await request<MemberProfileResponse>(`/members/${memberId}`);
  } catch {
    const user = appSeed.users.find((candidate) => candidate.id === memberId) as User;
    const summary = summarizeMember(user, appSeed.logs, appSeed.attendance, appSeed.learningTopics);
    const logs = appSeed.logs.filter((entry) => entry.userId === memberId) as DailyLog[];
    const attendance = appSeed.attendance.filter((entry) => entry.userId === memberId) as AttendanceEntry[];
    const learningTopics = appSeed.learningTopics.filter((entry) => entry.userId === memberId) as LearningTopic[];

    return {
      user,
      summary,
      weeklyProductivity: buildWeeklyProductivity(appSeed.logs, memberId),
      activityCalendar: buildActivityCalendar(appSeed.logs, appSeed.attendance, memberId),
      logs,
      attendance,
      learningTopics,
      weeklySummary: generateWeeklySummary(appSeed, memberId)
    };
  }
}

export async function getLogs() {
  try {
    return await request<DailyLog[]>("/logs");
  } catch {
    return appSeed.logs;
  }
}

export async function getAttendance() {
  try {
    return await request<AttendanceEntry[]>("/attendance");
  } catch {
    return appSeed.attendance.map((entry) => ({
      ...entry,
      memberName: appSeed.users.find((user) => user.id === entry.userId)?.name ?? entry.userId
    }));
  }
}

export async function getLearningTopics() {
  try {
    return await request<LearningTopic[]>("/learning");
  } catch {
    return appSeed.learningTopics;
  }
}

export async function getNotifications() {
  try {
    return await request<NotificationItem[]>("/notifications");
  } catch {
    return appSeed.notifications;
  }
}

export async function getLeaderboard() {
  try {
    const dashboard = await getDashboardOverview();
    return dashboard.leaderboard;
  } catch {
    return buildLeaderboard(appSeed);
  }
}
