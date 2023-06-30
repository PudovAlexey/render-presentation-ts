export type Users =
  | "Luke Skywalker"
  | "Darth Vader"
  | "Leia Organa"
  | "Owen Lars";

export type Message = {
  id: number;
  message: string;
  isMessageEdit: boolean;
  name: Users;
  img: string;
};

export type UserMessages = Record<Users, string[]>;

export type ImageConfig = Record<Users, string>;

export type FetchedMessages = {
  results: Omit<Message, "isMessageEdit" | "message" | "img">[];
};

export type MessagesDict = Record<number, Message>;

export type ChatAction =
  | {
      type: "sendMessage";
      payload: {
        inputValue: string;
      };
    }
  | {
      type: "onDeleteMessage" | "onStartChangeUserMessage" | "onMessageSave";
      payload: {
        messageId: Message["id"];
      };
    }
  | {
      type: "changeMessage";
      payload: {
        value: string;
        messageId: Message["id"];
      };
    }
  | {
      type: "fetchMessages";
      payload: {
        messages: MessagesDict;
      };
    };

