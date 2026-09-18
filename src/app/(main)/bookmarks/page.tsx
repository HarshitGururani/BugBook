import { validateRequest } from "@/auth";
import LoginPrompt from "@/components/LoginPrompt";
import TrendsSidebar from "@/components/TrendsSidebar";
import { Metadata } from "next";
import Bookmarks from "./Bookmarks";

export const metadata: Metadata = {
  title: "Bookmarks",
};

export default async function Page() {
  const { user } = await validateRequest();

  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <div className="rounded-2xl bg-card p-5 shadow-sm">
          <h1 className="text-center text-2xl font-bold">Bookmarks</h1>
        </div>
        {user ? (
          <Bookmarks />
        ) : (
          <LoginPrompt
            title="Log in to see bookmarks"
            description="Save posts you want to come back to after you create an account."
          />
        )}
      </div>
      <TrendsSidebar />
    </main>
  );
}
