import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "../../../components/auth-card";
import { LoginForm } from "../../../components/login-form";
import { getCurrentUser } from "../../../lib/auth-server";

export default async function LoginPage() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Login with your team credentials to access attendance, learning progress, daily submissions, and team analytics."
      footer={
        <span>
          Need an account? <Link href="/signup" className="font-semibold text-sky-700 dark:text-amber-300">Register here</Link>
        </span>
      }
    >
      <LoginForm />
    </AuthCard>
  );
}
