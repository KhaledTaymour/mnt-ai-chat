import { ChatAction, State } from "@/types/chat";
import { Dispatch, createContext } from "react";

export const ChatContext = createContext<State>({});
export const ChatDispatchContext = createContext<
  Dispatch<ChatAction | null> | any
>(null);
