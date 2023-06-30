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

export type MessagesDict = Record<number, Message>
