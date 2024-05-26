import { chatReducer } from "@/reducers/chat";
import { ChatMessage } from "@/types/chat";
import { useReducer, useEffect } from "react";

// Custom hook to use reducer with localStorage
export const useChatReducer = (initialState: Record<string, ChatMessage[]>) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  useEffect(() => {
    localStorage.setItem("chatHistory", JSON.stringify(state));
  }, [state]);

  return { state, dispatch };
};

export function getInitialState(): Record<string, ChatMessage[]> {
  const savedState = localStorage.getItem("chatHistory");
  return savedState ? JSON.parse(savedState) : {};
}
