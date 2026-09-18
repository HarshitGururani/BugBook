import GoogleSigninButton from "@/app/(auth)/login/GoogleSigninButton";
import Link from "next/link";
import { Button } from "./ui/button";

interface LoginPromptProps {
  title: string;
  description: string;
}

export default function LoginPrompt({ title, description }: LoginPromptProps) {
  return (
    <div className="space-y-5 rounded-2xl bg-card p-6 shadow-sm sm:p-8">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="mx-auto w-full max-w-sm space-y-4">
        <GoogleSigninButton />
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-muted" />
          <span className="text-sm text-muted-foreground">OR</span>
          <div className="h-px flex-1 bg-muted" />
        </div>
        <Button asChild className="w-full">
          <Link href="/signup">Sign up</Link>
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
