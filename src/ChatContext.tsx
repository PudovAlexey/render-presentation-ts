import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { fetchThousandMessages } from "./utils/fetchMessages";
import { ChatAction, MessagesDict, MessagesState } from "./types/types";
import { imgConfig } from "./utils/imgConfig";

const initialValue = {
  messagesById: {},
  input: "",
  sortMessages: false,
};

const StoreContext = createContext<MessagesState>(initialValue);
const DispatchContext = createContext<Dispatch<ChatAction> | null>(null);

export function ChatContext({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    fetchThousandMessages().then((messages: MessagesDict) => {
      dispatch({
        type: "fetchMessages",
        payload: {
          messages,
        },
      });
    });
  }, []);

  return (
    <DispatchContext.Provider value={useMemo(() => dispatch, [])}>
      <StoreContext.Provider value={state}>{children}</StoreContext.Provider>
    </DispatchContext.Provider>
  );
}

const reducer = (state: MessagesState, action: ChatAction): MessagesState => {
  const { type, payload } = action;
  switch (type) {
    case "sendMessage":
      const newId = +new Date();

      return {
        ...state,
        input: "",
        messagesById: {
          ...state.messagesById,
          [newId]: {
            id: newId,
            img: imgConfig["Darth Vader"],
            name: "Darth Vader",
            message: state.input,
            isMessageEdit: false,
          },
        },
      };
    case "onDeleteMessage":
      const cloneMessagesById = { ...state.messagesById };

      delete cloneMessagesById[payload.messageId];

      return {
        ...state,
        messagesById: cloneMessagesById,
      };
    case "onStartChangeUserMessage":
      return {
        ...state,
        messagesById: {
          ...state.messagesById,
          [payload.messageId]: {
            ...state.messagesById[payload.messageId],
            isMessageEdit: true,
          },
        },
      };
    case "changeMessage":
      return {
        ...state,
        messagesById: {
          ...state.messagesById,
          [payload.messageId]: {
            ...state.messagesById[payload.messageId],
            message: payload.value,
          },
        },
      };
    case "onMessageSave":
      return {
        ...state,
        messagesById: {
          ...state.messagesById,
          [payload.messageId]: {
            ...state.messagesById[payload.messageId],
            isMessageEdit: false,
          },
        },
      };
    case "fetchMessages":
      return {
        ...state,
        messagesById: {
          ...action.payload.messages,
        },
      };

    case "setInput":
      return {
        ...state,
        input: payload.value,
      };
    case "setSort":
      return {
        ...state,
        sortMessages: !state.sortMessages,
      };
    default:
      return state;
  }
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};

export const useDispatch = (): Dispatch<ChatAction> => {
  return useContext(DispatchContext) as Dispatch<ChatAction>;
};
