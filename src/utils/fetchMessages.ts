import { FetchedMessages, MessagesDict } from "../types/types";
import { generateRandomMessageByUserName } from "./generateRandomMessage";
import { imgConfig } from "./imgConfig";
import { makeRandomUnit } from "./makeRandomUnit";

export async function fetchMessages(): Promise<MessagesDict> {
  return await fetch("https://swapi.dev/api/people")
    .then((res) => res.json())
    .then((people: FetchedMessages) => {
      const messageIds = people.results.map(({ id }) => id);
      people.results.forEach((user, idx) => {
        if (imgConfig[user.name]) {
          messageIds.push(idx);
        }
      });

      const messagesDict = people.results.reduce(
        (acc: MessagesDict, user, id) => {
          if (messageIds.includes(id)) {
            acc[id] = {
              ...user,
              message: generateRandomMessageByUserName(user.name),
              isMessageEdit: false,
              img: imgConfig[user.name],
              id,
            };
          }
          return acc;
        },
        {}
      );
      return messagesDict;
    });
}

export async function fetchThousandMessages(): Promise<MessagesDict> {
  return await fetch("https://swapi.dev/api/people")
    .then((res) => res.json())
    .then((people: FetchedMessages) => {
      const messageIds = people.results.map(({ id }) => id);
      const generateIds = new Array(1000).fill("").map((_, id) => id + 10);

      people.results.forEach((user, idx) => {
        if (imgConfig[user.name]) {
          messageIds.push(idx);
        }
      });

      const messagesDict = people.results.reduce(
        (acc: MessagesDict, user, id) => {
          if (messageIds.includes(id)) {
            acc[id] = {
              ...user,
              isMessageEdit: false,
              message: generateRandomMessageByUserName(user.name),
              img: imgConfig[user.name],
              id,
            };
          }
          return acc;
        },
        {}
      );

      const thousandMessages = generateIds.reduce((acc: MessagesDict, id) => {
        const randomUserIndex = makeRandomUnit({
          min: 0,
          max: Object.keys(messagesDict).length - 1,
        });
        const cloneUserValue = {
          ...Object.values(messagesDict)[randomUserIndex],
        };
        acc[id] = {
          ...cloneUserValue,
          message: generateRandomMessageByUserName(cloneUserValue.name),
          id,
        };
        return acc;
      }, {});

      return thousandMessages;
    });
}
