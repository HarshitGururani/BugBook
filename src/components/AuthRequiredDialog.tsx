"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import GoogleSigninButton from "@/app/(auth)/login/GoogleSigninButton";
import Link from "next/link";
import {
  createContext,
  useCallback,
  useContext,
  useState,
} from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface AuthRequiredContextValue {
  requireAuth: (action?: string) => boolean;
}

const AuthRequiredContext = createContext<AuthRequiredContextValue | null>(
  null,
);

export function AuthRequiredProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useSession();
  const [open, setOpen] = useState(false);
  const [action, setAction] = useState("like, comment, and post");

  const requireAuth = useCallback(
    (nextAction?: string) => {
      if (user) return true;
      setAction(nextAction || "like, comment, and post");
      setOpen(true);
      return false;
    },
    [user],
  );

  return (
    <AuthRequiredContext.Provider value={{ requireAuth }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md bg-card sm:rounded-2xl">
          <DialogHeader className="space-y-2 text-center sm:text-center">
            <DialogTitle className="text-2xl">Create your account</DialogTitle>
            <DialogDescription>
              Join bugbook to {action}. You can keep scrolling the feed without
              an account.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
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
        </DialogContent>
      </Dialog>
    </AuthRequiredContext.Provider>
  );
}

export function useRequireAuth() {
  const context = useContext(AuthRequiredContext);
  if (!context) {
    throw new Error("useRequireAuth must be used within an AuthRequiredProvider");
  }
  return context.requireAuth;
}
