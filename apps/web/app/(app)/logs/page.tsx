import { LogsClient } from "../../../components/logs-client";
import { getLogs } from "../../../lib/api";

export default async function LogsPage() {
  const logs = await getLogs();
  return <LogsClient logs={logs} />;
}
