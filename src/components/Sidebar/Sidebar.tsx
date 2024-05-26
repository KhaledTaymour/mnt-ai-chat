import { useContext } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, Plus } from "lucide-react";
import { ChatDispatchContext } from "@/contexts/ChatContext";
import { StoreActions } from "@/types/chat";
import DeleteDialog from "@/components/Sidebar/DeleteDialog";

function Sidebar({
  isNewChat,
  setIsSidebarCollapsed,
  isSidebarCollapsed,
  conversationsKeys,
  selectedChatKey,
  setSelectedChatKey,
}: {
  isNewChat: boolean;
  setIsSidebarCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  isSidebarCollapsed: boolean;
  conversationsKeys: string[];
  selectedChatKey: string | null;
  setSelectedChatKey: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const dispatch = useContext(ChatDispatchContext);

  function toggleSidebar() {
    setIsSidebarCollapsed((prev) => !prev);
  }

  function createNewChat() {
    const timestamp = Date.now();

    dispatch({
      type: StoreActions.CREATE_NEW_CHAT,
      newChat: {
        [timestamp]: [],
      },
    });

    setSelectedChatKey(timestamp.toString());
  }

  return (
    <section className="p-3 flex flex-col gap-4 h-[100vh]">
      <section className="min-h10 ">
        <MenuIcon
          className="w-10 h-10 p-2 rounded-full cursor-pointer drop-shadow-sm         
          dark:bg-monta-500 dark:border-slate-50 
        hover:bg-slate-300 dark:hover:bg-monta-700 hover:drop-shadow-lg"
          onClick={toggleSidebar}
        />
      </section>

      {!isSidebarCollapsed && (
        <>
          <section className="md:flex p-2 text-start">
            <Button
              variant="outline"
              className="rounded-full bg-slate-300 hover:bg-slate-400 dark:bg-monta-500 dark:hover:bg-monta-700 border-0"
              disabled={isNewChat}
              onClick={createNewChat}
            >
              <Plus className="me-2 h-4 w-4" /> New Chat
            </Button>
          </section>

          {conversationsKeys.length ? (
            <>
              <h3 className="p-2 font-bold text-start">Chat History</h3>

              <ul className="flex flex-col gap-1 overflow-y-auto p-2 grow">
                {conversationsKeys.map((conversationKey, i) => {
                  const date = new Date(+conversationKey);
                  const localeString = date.toLocaleString();
                  const isSelected = conversationKey === selectedChatKey;
                  return (
                    <Button
                      key={conversationKey}
                      className={`flex justify-between items-center rounded border ps-2 pe-2 drop-shadow border-monta-700 m-2 cursor-pointer hover:bg-monta-700 hover:text-slate-100 ${
                        isSelected
                          ? "bg-monta-500 text-slate-100"
                          : "bg-slate-300 text-slate-900"
                      }`}
                      onClick={() => {
                        setSelectedChatKey(conversationKey);
                      }}
                    >
                      <label className="cursor-pointer">{`[#${i + 1}] `}</label>
                      <label className="cursor-pointer">{localeString}</label>

                      <DeleteDialog conversationKey={conversationKey} />
                    </Button>
                  );
                })}
              </ul>
            </>
          ) : (
            <div className="grow" />
          )}

          <article className="p-2">© copyright</article>
        </>
      )}
    </section>
  );
}

export default Sidebar;
