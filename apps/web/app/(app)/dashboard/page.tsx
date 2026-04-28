import { DashboardClient } from "../../../components/dashboard-client";
import { getDashboardOverview } from "../../../lib/api";

export default async function DashboardPage() {
  const dashboard = await getDashboardOverview();
  return <DashboardClient dashboard={dashboard} />;
}
