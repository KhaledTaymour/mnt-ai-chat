import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import { getInitialState, useChatReducer } from "./hooks/useChatReducer";
import { ConversationsList } from "./components/Sidebar/ConversationsList";
import ChatControl from "./components/ChatControl/ChatControl";
import LogoTransparent from "@/assets/images/logo-transparent.png";
import LogoHorizontalWhite from "@/assets/images/logo-horizontal-white.png";
import { ChatContext, ChatDispatchContext } from "@/contexts/ChatContext";
import { ModeToggle } from "./components/ModeToggle/ModeToggle";
import { useTheme } from "./providers/ThemeProvider";

function App() {
  const { theme } = useTheme();

  const { state, dispatch } = useChatReducer(getInitialState());

  const conversationsKeys = Object.keys(state);
  const [selectedChatKey, setSelectedChatKey] = useState(
    conversationsKeys[0] || null
  );

  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const chatMessages =
    selectedChatKey && state[selectedChatKey] ? state[selectedChatKey] : [];

  return (
    <ChatContext.Provider value={state}>
      <ChatDispatchContext.Provider value={dispatch}>
        <div className="app bg-slate-200 text-monta-900 dark:bg-monta-900 dark:text-slate-100 h-[100vh] flex">
          <aside
            className={`bg-slate-200 dark:bg-monta-800
         transition-all duration-300 ease-in-out         
         ${!isSidebarCollapsed ? "w-[340px]" : "w-[60px]"} 
         md:w-[340px] ${!isSidebarCollapsed ? "" : "md:w-[60px]"}
         `}
          >
            <Sidebar
              isNewChat={chatMessages?.length === 0}
              setIsSidebarCollapsed={setIsSidebarCollapsed}
              isSidebarCollapsed={isSidebarCollapsed}
              conversationsKeys={conversationsKeys}
              selectedChatKey={selectedChatKey}
              setSelectedChatKey={setSelectedChatKey}
            />
          </aside>

          <main className="bg-slate-50 dark:bg-monta-900 h-[100vh] flex-1 flex flex-col">
            <>
              <header
                className={`md:flex justify-between items-center h-[72px] ps-6 pe-6 ${
                  isSidebarCollapsed ? "flex" : "hidden"
                }`}
              >
                <section className="h-full flex justify-start items-center gap-6">
                  {theme === "dark" ? (
                    <img
                      src={LogoHorizontalWhite}
                      key="dark"
                      className="h-full p-3"
                    />
                  ) : (
                    <img src={LogoTransparent} key="light" className="h-full" />
                  )}
                  <h1 className="text-2xl">Chat</h1>
                </section>
                <ModeToggle />
              </header>

              <ConversationsList
                chatMessages={chatMessages}
                isSidebarCollapsed={isSidebarCollapsed}
              />
              <ChatControl
                selectedChatKey={selectedChatKey}
                setSelectedChatKey={setSelectedChatKey}
                isSidebarCollapsed={isSidebarCollapsed}
              />
            </>
          </main>
        </div>
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}

export default App;
