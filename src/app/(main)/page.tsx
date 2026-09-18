import PostEditor from "@/components/posts/editor/PostEditor";
import TrendsSidebar from "@/components/TrendsSidebar";
import GuestHero from "./GuestHero";
import HomeFeeds from "./HomeFeeds";

export default function Home() {
  return (
    <main className="flex w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <GuestHero />
        <PostEditor />
        <HomeFeeds />
      </div>
      <TrendsSidebar />
    </main>
  );
}
