import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { AppShell } from "../../components/app-shell";
import { getCurrentUser } from "../../lib/auth-server";

export default async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/login");
  }

  return <AppShell currentUser={currentUser}>{children}</AppShell>;
}
