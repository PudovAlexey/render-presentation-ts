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
      return state;
    case "onDeleteMessage":
      return state;
    case "onStartChangeUserMessage":
      return state;
    case "changeMessage":
      return state;
    case "onMessageSave":
      return state;
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
