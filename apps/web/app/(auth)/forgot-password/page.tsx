import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthCard } from "../../../components/auth-card";
import { ForgotPasswordForm } from "../../../components/forgot-password-form";
import { getCurrentUser } from "../../../lib/auth-server";

export default async function ForgotPasswordPage() {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Reset password"
      description="Enter your registered email and the backend will issue a reset token or integrate with your email delivery provider."
      footer={
        <span>
          Return to <Link href="/login" className="font-semibold text-sky-700 dark:text-amber-300">login</Link>
        </span>
      }
    >
      <ForgotPasswordForm />
    </AuthCard>
  );
}
