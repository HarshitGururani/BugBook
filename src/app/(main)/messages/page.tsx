import { Metadata } from "next";
import Chat from "./Chat";

export const metaadata: Metadata = {
  title: "Messages",
};

export default function Page() {
  return <Chat />;
}
