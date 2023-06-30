import {
  Dispatch,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { fetchThousandMessages } from "./utils/fetchMessages";
import { ChatAction, MessagesDict } from "./types/types";
import { imgConfig } from "./utils/imgConfig";

const StoreContext = createContext<MessagesDict>({});
const DispatchContext = createContext<Dispatch<ChatAction> | null>(null);

export function ChatContext({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {});

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

const reducer = (state: MessagesDict, action: ChatAction): MessagesDict => {
  const { type, payload } = action;
  switch (type) {
    case "sendMessage":
      const newId = +new Date();

      return {
        ...state,
        [newId]: {
          id: newId,
          img: imgConfig["Darth Vader"],
          name: "Darth Vader",
          message: payload.inputValue,
          isMessageEdit: false,
        },
      };
    case "onDeleteMessage":
      const cloneMessagesById = { ...state };

      delete cloneMessagesById[payload.messageId];
      return cloneMessagesById;
    case "onStartChangeUserMessage":
      return {
        ...state,
        [payload.messageId]: {
          ...state[payload.messageId],
          isMessageEdit: true,
        },
      };
    case "changeMessage":
      return {
        ...state,
        [payload.messageId]: {
          ...state[payload.messageId],
          message: payload.value,
        },
      };
    case "onMessageSave":
      return {
        ...state,
        [payload.messageId]: {
          ...state[payload.messageId],
          isMessageEdit: false,
        },
      };
    case "fetchMessages":
      return action.payload.messages;
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
