import React from "react";
import { createFragmentContainer } from "react-relay";
import graphql from "babel-plugin-relay/macro";
import { chatMessage_message } from "./__generated__/chatMessage_message.graphql";

const ChatMessage: React.FC<{ message: chatMessage_message }> = React.memo(
  ({ message }) => {
    return (
      <li style={{ display: "flex", padding: 16 }}>
        <div style={{ fontWeight: "bold", width: "100%", maxWidth: 150 }}>
          {message.authorName}
        </div>
        <div style={{ marginLeft: 16 }}>{message.rawContent}</div>
      </li>
    );
  }
);

export default createFragmentContainer(ChatMessage, {
  message: graphql`
    fragment chatMessage_message on Message {
      id
      authorName
      rawContent
      createdAt
    }
  `,
});
