import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import background from "../public/background.jpg";
import styled from "@emotion/styled";
import iconSrc from "../public/icons8-star-wars-1344.png";
import { fetchMessages, fetchThousandMessages } from "../utils/fetchMessages";
import { imgConfig } from "../utils/imgConfig";
import { Message, MessagesDict } from "../types/types";

export function Chat() {
  const [messagesById, setMessagesById] = useState<MessagesDict>({});
  const [inputValue, setInputValue] = useState("");
  const [sortMessages, setSortMessages] = useState(false);
  const messagesRef = useRef<React.Dispatch<
    React.SetStateAction<MessagesDict>
  > | null>();
  messagesRef.current = setMessagesById;

  useEffect(() => {
    fetchThousandMessages().then((messages) => {
      setMessagesById(messages);
    });
  }, []);

  const sendMessage = () => {
    const newId: Message["id"] = +new Date();

    setMessagesById((prev) => ({
      ...prev,
      [newId]: {
        id: newId,
        img: imgConfig["Darth Vader"],
        name: "Darth Vader",
        message: inputValue,
        isMessageEdit: false,
      },
    }));
  };

  const onSort = () => {
    setSortMessages((prev) => !prev);
  };

  const onDeleteMessage = useCallback((messageId: Message["id"]) => {
    const cloneMessagesById = { ...messagesById };

    delete cloneMessagesById[messageId];

    setMessagesById(cloneMessagesById);
  }, []);

  return (
    <Root>
      <StarwarsIcon src={iconSrc} />
      <ContentWrapper>
        <TitleBlock>
          <StarWarsTitle variant="h2">Чат повстанцев</StarWarsTitle>
          <Button onClick={onSort}>SORT</Button>
        </TitleBlock>
        <AppBox>
          <List>
            {Object.keys(messagesById)
              .sort((a, b) => (!sortMessages ? +a - +b : +b - +a))
              .map((id) => {
                const messageId = +id as Message["id"];
                const message = messagesById[messageId];
                return (
                  <MessageComponent
                    key={messageId}
                    onDeleteMessage={onDeleteMessage}
                    setMessagesRef={
                      messagesRef as React.MutableRefObject<
                        React.Dispatch<React.SetStateAction<MessagesDict>>
                      >
                    }
                    message={message}
                  />
                );
              })}
          </List>
        </AppBox>
        <MessageInputBlockWrapper>
          <MessageInputBlock>
            <Avatar src={imgConfig["Darth Vader"]}></Avatar>
            <TextField
              fullWidth
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <SendButton variant="contained" onClick={sendMessage}>
              SEND
            </SendButton>
          </MessageInputBlock>
        </MessageInputBlockWrapper>
      </ContentWrapper>
    </Root>
  );
}

const MessageComponent = React.memo(function Message({
  message,
  setMessagesRef,
  onDeleteMessage,
}: {
  message: Message;
  setMessagesRef: React.MutableRefObject<
    React.Dispatch<React.SetStateAction<MessagesDict>>
  >;
  onDeleteMessage: (messageId: number) => void;
}) {
  const onStartChangeUserMessage = (messageId: Message["id"]) => {
    setMessagesRef.current((prev) => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        isMessageEdit: true,
      },
    }));
  };

  const changeMessage = (messageId: Message["id"], value: string) => {
    setMessagesRef.current((prev) => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        message: value,
      },
    }));
  };

  const onMessageSave = (messageId: Message["id"]) => {
    setMessagesRef.current((prev) => ({
      ...prev,
      [messageId]: {
        ...prev[messageId],
        isMessageEdit: false,
      },
    }));
  };

  return (
    <Box>
      <ListItem
        secondaryAction={
          message.isMessageEdit ? (
            <Button
              color="success"
              variant="contained"
              onClick={() => onMessageSave(message.id)}
            >
              SAVE
            </Button>
          ) : (
            <Box>
              <Button
                variant="contained"
                color="success"
                onClick={() => onStartChangeUserMessage(message.id)}
              >
                EDIT MESSAGE
              </Button>
              <Button onClick={() => onDeleteMessage(message.id)}>
                DELETE MESSAGE
              </Button>
            </Box>
          )
        }
      >
        <ListItemAvatar>
          <Avatar src={message.img}></Avatar>
        </ListItemAvatar>
        <Box>
          <Typography fontWeight={"bold"}>{message.name}</Typography>
          {!message.isMessageEdit ? (
            <MessageTypography>{message.message}</MessageTypography>
          ) : (
            <TextField
              fullWidth
              onChange={(e) => changeMessage(message.id, e.target.value)}
              value={message.message}
            />
          )}
        </Box>
      </ListItem>
      <Divider />
    </Box>
  );
});

const Root = styled(Box)`
  position: relative;
  height: 100vh;
  overflow: hidden;
  width: 100vw;
  background-image: url(${background});
`;

const ContentWrapper = styled(Paper)`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 30px;
  bottom: 120px;
  left: 50px;
  right: 50px;
  padding-bottom: 30px;
`;

const SendButton = styled(Button)`
  text-align: center;
  width: 10%;
`;

const StarWarsTitle = styled(Typography)`
  color: black;
  text-shadow: -3px 3px 0px #fd0;
`;

const TitleBlock = styled(Box)`
  text-align: center;
  padding-bottom: 50px;
`;

const StarwarsIcon = styled("img")``;

const AppBox = styled(Paper)`
  padding: 2rem 3rem;
  z-index: 5;
  overflow: auto;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column-reverse;
  width: 70%;
`;

const MessageInputBlockWrapper = styled(Paper)`
  position: relative;
  bottom: -100px;
  right: 0%;
  width: 100%;
  left: 0%;
  right: 0;
  margin: 0 auto;
`;

const MessageInputBlock = styled(Box)`
  padding: 10px 5%;
  gap: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5;
  right: 0%;
  width: 90%;
`;

const MessageTypography = styled(Typography)`
  max-width: 50%;
`;
