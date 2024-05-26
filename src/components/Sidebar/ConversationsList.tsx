import { useEffect, useRef } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { ChatMessage, UserRole } from "@/types/chat";
import LogoSymbol from "@/assets/images/symbol-transparent.png";
import NewChat from "@/components/Sidebar/NewChat";

type ConversationsListProps = {
  chatMessages: ChatMessage[];
  isSidebarCollapsed: boolean;
};
export function ConversationsList({
  chatMessages,
  isSidebarCollapsed,
}: ConversationsListProps) {
  const isNewChat = chatMessages?.length === 0;

  const anchorBottomElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (anchorBottomElementRef.current) {
      anchorBottomElementRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages]);

  return (
    <ScrollArea
      className={`md:block grow mt-1 mb-1 border-t-4 border-b-4 overflow-y-scroll scrollbar-always-visible border-t-monta-500 dark:border-t-monta-800 ${
        isSidebarCollapsed ? "" : "hidden"
      }`}
    >
      <section className="flex justify-center">
        <div className="flex flex-col gap-4 p-4 pt-0 w-full lg:w-[750px]">
          {isNewChat ? (
            <NewChat />
          ) : (
            chatMessages?.map((item) => (
              <div
                key={item.id}
                className={cn(
                  `w-full flex ${
                    item.role === UserRole.user ? "justify-end" : ""
                  } rounded-lg text-left text-sm transition-all`
                )}
              >
                <span
                  className={`border rounded-t p-2 items-center text-monta-900 ${
                    item.role === UserRole.user
                      ? "text-end bg-slate-300 rounded-bl"
                      : "text-start bg-slate-50 border-slate-300 flex justify-center items-start gap-1 rounded-br"
                  }`}
                >
                  {item.role === UserRole.assistant && (
                    <img src={LogoSymbol} className="w-8" />
                  )}
                  <label>{item.content}</label>
                </span>
              </div>
            ))
          )}
          <div ref={anchorBottomElementRef} className="py-7" />
        </div>
      </section>
    </ScrollArea>
  );
}
