import { validateRequest } from "@/auth";
import LoginPrompt from "@/components/LoginPrompt";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import Notifications from "./Notifications";

export const metadata: Metadata = {
  title: "Notifications",
};

export default async function Page() {
  const { user } = await validateRequest();

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-2xl font-bold">Notifications</h1>
        </div>
        {user ? (
          <Notifications />
        ) : (
          <LoginPrompt
            title="Log in to see notifications"
            description="Likes, comments, and follows will show up here once you have an account."
          />
        )}
      </div>
      <TrendsSidebar />
    </main>
  );
}
