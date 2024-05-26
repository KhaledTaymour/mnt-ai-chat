import { ChatMessage, State, StoreActions } from "@/types/chat";

export function chatReducer(
  state: State,
  action:
    | {
        type: StoreActions.CREATE_NEW_CHAT;
        newChat: State;
      }
    | {
        type: StoreActions.ADD_CONTENT_TO_CHAT;
        payload: {
          chatID: string;
          newContent: ChatMessage;
        };
      }
    | { type: StoreActions.DELETE_CHAT; chatID: string }
): State {
  switch (action.type) {
    case StoreActions.CREATE_NEW_CHAT:
      return {
        ...state,
        ...action.newChat,
      };
    case StoreActions.ADD_CONTENT_TO_CHAT: {
      const { chatID, newContent } = action.payload;
      return {
        ...state,
        [chatID]: [...(state[chatID] || []), newContent],
      };
    }
    case StoreActions.DELETE_CHAT: {
      const newState = { ...state };
      delete newState[action.chatID];
      return newState;
    }
    default:
      return state;
  }
}
