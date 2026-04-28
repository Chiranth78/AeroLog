export type Role = "admin" | "lead" | "member";

export type Domain =
  | "Aerodynamics"
  | "Structures"
  | "Electronics"
  | "Propulsion"
  | "CAD"
  | "Simulation"
  | "Manufacturing";

export type ProgressStatus = "Completed" | "In Progress" | "Pending";

export type AttendanceStatus = "Present" | "Absent" | "On Leave" | "Late";

export type ActivityState = "active" | "inactive";

export type ApprovalStatus = "approved" | "pending-review" | "changes-requested";

export type TopicStatus = "not-started" | "in-progress" | "completed";

export interface Attachment {
  id: string;
  type: "file" | "image" | "pdf" | "link";
  name: string;
  url: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  domain: Domain;
  year: string;
  batch: string;
  teamRole: string;
  avatarUrl: string;
  bio: string;
  joinedAt: string;
  phone: string;
  status: ActivityState;
}

export interface DailyLog {
  id: string;
  userId: string;
  date: string;
  topicsStudied: string[];
  conceptsRevised: string[];
  tasksCompleted: string[];
  toolsPracticed: string[];
  researchWork: string[];
  problemsFaced: string[];
  hoursWorked: number;
  learningSummary: string;
  status: ProgressStatus;
  attachments: Attachment[];
  links: string[];
  approvalStatus: ApprovalStatus;
  mentorComment?: string;
}

export interface AttendanceEntry {
  id: string;
  userId: string;
  date: string;
  status: AttendanceStatus;
  reason?: string;
  markedAt: string;
  overrideBy?: string;
}

export interface LearningTopic {
  id: string;
  userId: string;
  title: string;
  domain: Domain;
  category: string;
  roadmapStage: string;
  assignedBy: string;
  status: TopicStatus;
  revisionComplete: boolean;
  mentorFeedback: string;
  skillTags: string[];
  completedAt?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  type: "reminder" | "alert" | "announcement" | "summary";
  createdAt: string;
  audience: Role | "all";
}

export interface MemberSummary {
  id: string;
  name: string;
  role: Role;
  domain: Domain;
  year: string;
  batch: string;
  teamRole: string;
  avatarUrl: string;
  status: ActivityState;
  attendancePercentage: number;
  totalDailyEntries: number;
  topicsCompleted: number;
  skillsLearned: string[];
  productivityScore: number;
  streakCount: number;
  fundamentalsScore: number;
}

export interface ChartPoint {
  label: string;
  value: number;
}

export interface ActivityDay {
  date: string;
  intensity: number;
  submitted: boolean;
  attended: AttendanceStatus | null;
}

export interface DashboardMetrics {
  activeMembers: number;
  inactiveMembers: number;
  attendanceRate: number;
  submissionsToday: number;
  pendingApprovals: number;
  averageProductivity: number;
  noSubmissionToday: string[];
}

export interface DashboardOverview {
  metrics: DashboardMetrics;
  leaderboard: MemberSummary[];
  domainProgress: Array<{ domain: Domain; completion: number; members: number }>;
  attendanceTrend: ChartPoint[];
  productivityTrend: ChartPoint[];
  recentLogs: Array<DailyLog & { memberName: string; domain: Domain }>;
  announcements: NotificationItem[];
}

export interface AppSeed {
  users: User[];
  logs: DailyLog[];
  attendance: AttendanceEntry[];
  learningTopics: LearningTopic[];
  notifications: NotificationItem[];
}
