import { IContextType } from "./@types";
import * as faker from "faker";

const getRandomInt = (max: number, min = 0) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const registerFakeUsers = ({ context }: { context: IContextType }) => {
  let counter = 0;
  const addRandomMessage = () => {
    counter = counter + 1;
    context.addMessage({
      id: String(counter),
      authorName: faker.internet.userName(),
      rawContent: faker.lorem.sentences(getRandomInt(3, 1)),
      createdAt: new Date(),
    });
  };

  setInterval(addRandomMessage, 2000).unref();
};
