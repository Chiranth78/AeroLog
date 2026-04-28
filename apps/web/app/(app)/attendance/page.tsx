import { AttendanceClient } from "../../../components/attendance-client";
import { getAttendance } from "../../../lib/api";

export default async function AttendancePage() {
  const entries = await getAttendance();
  return <AttendanceClient entries={entries} />;
}
