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

    case "onDeleteMessage":
    case "onStartChangeUserMessage":
    case "changeMessage":
    case "onMessageSave":
    case "fetchMessages":
    case "setInput":
    case "setSort":
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
