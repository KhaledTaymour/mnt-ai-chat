import { useContext, useState } from "react";
import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { StoreActions, UserRole } from "@/types/chat";
import { ChatContext, ChatDispatchContext } from "@/contexts/ChatContext";

type ChatControlProps = {
  selectedChatKey: string | null;
  setSelectedChatKey: React.Dispatch<React.SetStateAction<string | null>>;
  isSidebarCollapsed: boolean;
};
function ChatControl({
  selectedChatKey,
  setSelectedChatKey,
  isSidebarCollapsed,
}: ChatControlProps) {
  const state = useContext(ChatContext);
  const dispatch = useContext(ChatDispatchContext);

  const [inputValue, setInputValue] = useState("");

  function handleWriting(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setInputValue(e.target.value);
  }

  function handleAddQuestion() {
    if (selectedChatKey && state[selectedChatKey]) {
      dispatch({
        type: StoreActions.ADD_CONTENT_TO_CHAT,
        payload: {
          chatID: selectedChatKey,
          newContent: {
            id: state[selectedChatKey].length.toString(),
            content: inputValue,
            role: UserRole.user,
          },
        },
      });
      dispatch({
        type: StoreActions.ADD_CONTENT_TO_CHAT,
        payload: {
          chatID: selectedChatKey,
          newContent: {
            id: (state[selectedChatKey].length + 1).toString(),
            content: `This is the answer for ${inputValue}`,
            role: UserRole.assistant,
          },
        },
      });
    } else {
      const timestamp = Date.now();

      dispatch({
        type: StoreActions.CREATE_NEW_CHAT,
        newChat: {
          [timestamp]: [
            { id: "1", content: inputValue, role: UserRole.user },
            {
              id: "2",
              content: `This is the answer for ${inputValue}`,
              role: UserRole.assistant,
            },
          ],
        },
      });

      setSelectedChatKey(timestamp.toString());
    }
    setInputValue("");
  }

  return (
    <section
      className={`md:flex justify-center items-center gap-4 ms-4 me-4 mb-1 ${
        isSidebarCollapsed ? "flex" : "hidden"
      }`}
    >
      <Textarea
        className="rounded resize-none md:w-[750px] dark:bg-monta-800"
        value={inputValue}
        onChange={handleWriting}
        onKeyDown={(e) => {
          if (
            e.code === "Enter" &&
            !e.shiftKey &&
            !e.altKey &&
            !e.ctrlKey &&
            !e.metaKey
          ) {
            handleAddQuestion();
            e.preventDefault();
          }
        }}
      />
      <Button
        size={"icon"}
        className="bg-monta-500 text-white p-0 rounded  hover:text-monta-500"
        onClick={handleAddQuestion}
      >
        <Play className="h-4 w-4" />
      </Button>
    </section>
  );
}

export default ChatControl;
