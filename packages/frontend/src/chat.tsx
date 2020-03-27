import React from "react";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { chat_app } from "./__generated__/chat_app.graphql";
import ChatMessage from "./chat-message";

const ChatWindow: React.FC<{ app: chat_app }> = ({ app }) => {
  const ref = React.useRef<HTMLUListElement | null>(null);
  const [follow, setFollow] = React.useState(true);
  React.useEffect(() => {
    if (!ref.current) return;
    if (follow === true) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [app.messages, follow]);
  return (
    <ul
      ref={ref}
      style={{ overflowY: "scroll", flexGrow: 1 }}
      onScroll={() => {
        if (!ref.current) return;
        const target: HTMLElement = ref.current;
        if (target.scrollTop !== target.scrollHeight - target.clientHeight) {
          setFollow(false);
        } else {
          setFollow(true);
        }
      }}
    >
      {app.messages.map((message) => (
        <ChatMessage message={message} key={message.id} />
      ))}
    </ul>
  );
};

export default createFragmentContainer(ChatWindow, {
  app: graphql`
    fragment chat_app on Query {
      messages {
        id
        ...chatMessage_message
      }
    }
  `,
});
