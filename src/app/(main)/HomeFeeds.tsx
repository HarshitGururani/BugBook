"use client";

import { useSession } from "@/app/(main)/SessionProvider";
import LoginPrompt from "@/components/LoginPrompt";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FollowingFeed from "./FollowingFeed";
import ForYouFeed from "./ForYouFeed";

export default function HomeFeeds() {
  const { user } = useSession();

  return (
    <Tabs defaultValue="for-you">
      <TabsList>
        <TabsTrigger value="for-you">For you</TabsTrigger>
        <TabsTrigger value="following">Following</TabsTrigger>
      </TabsList>
      <TabsContent value="for-you">
        <ForYouFeed />
      </TabsContent>
      <TabsContent value="following">
        {user ? (
          <FollowingFeed />
        ) : (
          <LoginPrompt
            title="Log in to see following"
            description="Follow people to build this feed. Create an account to get started."
          />
        )}
      </TabsContent>
    </Tabs>
  );
}
