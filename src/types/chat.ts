export enum UserRole {
  "user" = "user",
  "assistant" = "assistant",
}

export type ChatMessage = {
  role: UserRole;
  id: string;
  content: string;
};

export type State = Record<string, ChatMessage[]>;

export enum StoreActions {
  CREATE_NEW_CHAT = "CREATE_NEW_CHAT",
  ADD_CONTENT_TO_CHAT = "ADD_CONTENT_TO_CHAT",
  DELETE_CHAT = "DELETE_CHAT",
}

export type ChatAction =
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
  | {
      type: StoreActions.DELETE_CHAT;
      chatID: string;
    };
