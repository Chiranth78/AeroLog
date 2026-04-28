import { MemberProfileClient } from "../../../../components/member-profile-client";
import { getMemberProfile } from "../../../../lib/api";

export default async function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const profile = await getMemberProfile(id);

  return <MemberProfileClient {...profile} />;
}
