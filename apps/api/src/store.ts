import { appSeed, buildActivityCalendar, buildWeeklyProductivity, generateWeeklySummary, summarizeMember } from "@aerodesign/shared";
import type {
  AppSeed,
  AttendanceEntry,
  DailyLog,
  LearningTopic,
  NotificationItem,
  User
} from "@aerodesign/shared";

const store: AppSeed = JSON.parse(JSON.stringify(appSeed));

export const db = {
  users: store.users,
  logs: store.logs,
  attendance: store.attendance,
  learningTopics: store.learningTopics,
  notifications: store.notifications
};

export const makeId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

export const findUser = (userId: string) => db.users.find((user) => user.id === userId);

export const createUser = (user: User) => {
  db.users.push(user);
  return user;
};

export const createLog = (log: DailyLog) => {
  db.logs.unshift(log);
  return log;
};

export const createAttendance = (entry: AttendanceEntry) => {
  const existing = db.attendance.find((item) => item.userId === entry.userId && item.date === entry.date);
  if (existing) {
    Object.assign(existing, entry);
    return existing;
  }

  db.attendance.unshift(entry);
  return entry;
};

export const upsertLearningTopic = (topicId: string, updates: Partial<LearningTopic>) => {
  const topic = db.learningTopics.find((item) => item.id === topicId);
  if (!topic) {
    return null;
  }

  Object.assign(topic, updates);
  return topic;
};

export const createNotification = (notification: NotificationItem) => {
  db.notifications.unshift(notification);
  return notification;
};

export const getMemberProfile = (userId: string) => {
  const user = findUser(userId);
  if (!user) {
    return null;
  }

  return {
    user,
    summary: summarizeMember(user, db.logs, db.attendance, db.learningTopics),
    weeklyProductivity: buildWeeklyProductivity(db.logs, userId),
    activityCalendar: buildActivityCalendar(db.logs, db.attendance, userId),
    logs: db.logs.filter((entry) => entry.userId === userId),
    attendance: db.attendance.filter((entry) => entry.userId === userId),
    learningTopics: db.learningTopics.filter((entry) => entry.userId === userId),
    weeklySummary: generateWeeklySummary(db, userId)
  };
};
