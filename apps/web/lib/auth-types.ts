export interface AuthUser {
  id: string;
  name: string;
  role: "admin" | "lead" | "member";
  domain: string;
  teamRole: string;
  avatarUrl: string;
  attendancePercentage: number;
  totalDailyEntries: number;
  productivityScore: number;
  streakCount: number;
}
