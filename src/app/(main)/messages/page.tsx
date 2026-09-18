import { validateRequest } from "@/auth";
import LoginPrompt from "@/components/LoginPrompt";
import { Metadata } from "next";
import Chat from "./Chat";

export const metadata: Metadata = {
  title: "Messages",
};

export default async function Page() {
  const { user } = await validateRequest();

  if (!user) {
    return (
      <main className="w-full min-w-0">
        <LoginPrompt
          title="Log in to chat"
          description="Create an account or log in to send messages and see your conversations."
        />
      </main>
    );
  }

  return <Chat />;
}
