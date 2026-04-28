import { buildDashboardOverview, summarizeMember } from "@aerodesign/shared";
import type { AppSeed } from "@aerodesign/shared";

export const mapTeamReport = (seed: AppSeed) =>
  seed.users.map((user) => {
    const summary = summarizeMember(user, seed.logs, seed.attendance, seed.learningTopics);

    return {
      member: summary.name,
      role: summary.role,
      domain: summary.domain,
      batch: summary.batch,
      teamRole: summary.teamRole,
      attendancePercentage: summary.attendancePercentage,
      dailyEntries: summary.totalDailyEntries,
      topicsCompleted: summary.topicsCompleted,
      streakCount: summary.streakCount,
      productivityScore: summary.productivityScore,
      fundamentalsScore: summary.fundamentalsScore
    };
  });

export const mapAttendanceReport = (seed: AppSeed) =>
  seed.attendance.map((entry) => ({
    member: seed.users.find((user) => user.id === entry.userId)?.name ?? entry.userId,
    date: entry.date,
    status: entry.status,
    reason: entry.reason ?? "",
    markedAt: entry.markedAt,
    overrideBy: entry.overrideBy ?? ""
  }));

export const mapLogsReport = (seed: AppSeed) =>
  seed.logs.map((log) => ({
    member: seed.users.find((user) => user.id === log.userId)?.name ?? log.userId,
    domain: seed.users.find((user) => user.id === log.userId)?.domain ?? "",
    date: log.date,
    topicsStudied: log.topicsStudied.join(" | "),
    conceptsRevised: log.conceptsRevised.join(" | "),
    tasksCompleted: log.tasksCompleted.join(" | "),
    toolsPracticed: log.toolsPracticed.join(" | "),
    researchWork: log.researchWork.join(" | "),
    problemsFaced: log.problemsFaced.join(" | "),
    hoursWorked: log.hoursWorked,
    status: log.status,
    approvalStatus: log.approvalStatus,
    summary: log.learningSummary
  }));

export const mapMemberReport = (seed: AppSeed, memberId: string) => {
  const user = seed.users.find((candidate) => candidate.id === memberId);
  if (!user) {
    return null;
  }

  const summary = summarizeMember(user, seed.logs, seed.attendance, seed.learningTopics);
  const overview = buildDashboardOverview(seed);

  return {
    profile: [
      {
        name: summary.name,
        email: user.email,
        role: summary.role,
        domain: summary.domain,
        attendancePercentage: summary.attendancePercentage,
        dailyEntries: summary.totalDailyEntries,
        topicsCompleted: summary.topicsCompleted,
        productivityScore: summary.productivityScore,
        streakCount: summary.streakCount,
        fundamentalsScore: summary.fundamentalsScore
      }
    ],
    logs: mapLogsReport(seed).filter((row) => row.member === summary.name),
    attendance: mapAttendanceReport(seed).filter((row) => row.member === summary.name),
    learning: seed.learningTopics
      .filter((topic) => topic.userId === memberId)
      .map((topic) => ({
        title: topic.title,
        category: topic.category,
        roadmapStage: topic.roadmapStage,
        status: topic.status,
        revisionComplete: topic.revisionComplete,
        mentorFeedback: topic.mentorFeedback
      })),
    benchmark: overview.leaderboard.slice(0, 5).map((member) => ({
      name: member.name,
      productivityScore: member.productivityScore,
      attendancePercentage: member.attendancePercentage
    }))
  };
};
