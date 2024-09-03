import {
  ChannelList,
  ChannelPreviewMessenger,
  ChannelPreviewUIComponentProps,
  useChatContext,
} from "stream-chat-react";
import { useSession } from "../SessionProvider";
import { Button } from "@/components/ui/button";
import { MailPlus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import NewChatDialog from "./NewChatDialog";
import { useQueryClient } from "@tanstack/react-query";

interface ChatSideBarProps {
  open: boolean;
  onClose: () => void;
}
const ChatSideBar = ({ onClose, open }: ChatSideBarProps) => {
  const { user } = useSession();
  const { channel } = useChatContext();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (channel?.id) {
      queryClient.invalidateQueries({
        queryKey: ["unread-messages-count"],
      });
    }
  }, [channel?.id, queryClient]);

  const ChannelPreviewCustom = useCallback(
    (props: ChannelPreviewUIComponentProps) => (
      <ChannelPreviewMessenger
        {...props}
        onSelect={() => {
          props.setActiveChannel?.(props.channel, props.watchers);
          onClose();
        }}
      />
    ),
    [onClose],
  );

  return (
    <div
      className={cn(
        "size-full flex-col border-e md:flex md:w-72",
        open ? "flex" : "hidden",
      )}
    >
      <MenuHeader onClose={onClose} />
      <ChannelList
        filters={{
          type: "messaging",
          members: { $in: [user.id] },
        }}
        showChannelSearch
        options={{ state: true, presence: true, limit: 8 }}
        sort={{ last_message_at: -1 }}
        additionalChannelSearchProps={{
          searchForChannels: true,
          searchQueryParams: {
            channelFilters: {
              filters: { members: { $in: [user.id] } },
            },
          },
        }}
        Preview={ChannelPreviewCustom}
      />
    </div>
  );
};
export default ChatSideBar;

interface MenuHeaderPops {
  onClose: () => void;
}

function MenuHeader({ onClose }: MenuHeaderPops) {
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  return (
    <>
      <div className="mr-9 flex items-center gap-3">
        <div className="h-full md:hidden">
          <Button size={"icon"} variant={"ghost"} onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>
        <h1 className="me-auto text-xl font-bold md:ms-2">Messages</h1>
        <Button
          size={"icon"}
          variant={"ghost"}
          title="Start new chat"
          onClick={() => setShowNewChatDialog(true)}
        >
          <MailPlus className="size-5" />
        </Button>
      </div>

      {showNewChatDialog && (
        <NewChatDialog
          onChatCreated={() => {
            setShowNewChatDialog(false);
            onClose();
          }}
          onOpenChange={setShowNewChatDialog}
        />
      )}
    </>
  );
}
