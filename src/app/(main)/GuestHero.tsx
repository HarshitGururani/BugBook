"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function GuestHero() {
  const { user } = useSession();

  if (user) return null;

  return (
    <section className="space-y-4 rounded-2xl bg-card p-6 shadow-sm sm:p-8">
      <p className="text-sm font-medium text-primary">Welcome to bugbook</p>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
        See what people are posting.
      </h1>
      <p className="max-w-xl text-muted-foreground">
        Scroll the feed freely. Create an account when you want to like,
        comment, or share a post of your own.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild>
          <Link href="/signup">Create your account</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/login">Log in</Link>
        </Button>
      </div>
    </section>
  );
}
