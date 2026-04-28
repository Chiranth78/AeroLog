import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "../../../components/auth-card";
import { SignupForm } from "../../../components/signup-form";
import { getCurrentUser } from "../../../lib/auth-server";

export default async function SignupPage() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Create your team account"
      description="Register new members with domain, batch, and role assignment so access and analytics stay consistent from day one."
      footer={
        <span>
          Already have an account? <Link href="/login" className="font-semibold text-sky-700 dark:text-amber-300">Login</Link>
        </span>
      }
    >
      <SignupForm />
    </AuthCard>
  );
}
