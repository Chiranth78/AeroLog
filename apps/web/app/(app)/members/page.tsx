import { MembersClient } from "../../../components/members-client";
import { getMembers } from "../../../lib/api";

export default async function MembersPage() {
  const members = await getMembers();
  return <MembersClient members={members} />;
}
