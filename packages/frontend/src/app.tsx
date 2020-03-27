import React, { useCallback } from "react";
import graphql from "babel-plugin-relay/macro";
import Chat from "./chat";
import { QueryRenderer, requestSubscription } from "react-relay";
import { appSubscription } from "./__generated__/appSubscription.graphql";
import { appQuery } from "./__generated__/appQuery.graphql";
import { applyPatch } from "./jsonpatch";
import { useMessageAddMutation } from "./message-add-mutation";
import { useEnvironment } from "./relay-environment";

const AppSubscription = graphql`
  subscription appSubscription {
    live {
      query {
        ...chat_app
      }
      patch {
        op
        path
        from
        value
      }
    }
  }
`;

const AppQuery = graphql`
  query appQuery {
    ...chat_app
  }
`;

const Container: React.FC<{}> = ({ children }) => (
  <div
    style={{
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      padding: 20,
    }}
  >
    {children}
  </div>
);

const useLocalStorageState = (
  identifier: string
): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [state, setState] = React.useState(
    () => window.localStorage.getItem(identifier) || "anon"
  );
  React.useEffect(() => {
    setState((state) => window.localStorage.getItem(identifier) || state);
  }, [identifier]);

  React.useEffect(() => {
    const eventListener = (event: StorageEvent) => {
      if (
        !event.storageArea ||
        event.storageArea !== localStorage ||
        event.key !== identifier ||
        !event.newValue
      ) {
        return;
      }
      setState(event.newValue);
    };
    window.addEventListener("storage", eventListener, false);
    return () => window.removeEventListener("storage", eventListener);
  }, [identifier]);

  const prevState = React.useRef(state);
  React.useEffect(() => {
    if (prevState.current !== state) {
      window.localStorage.setItem(identifier, state);
    }
  }, [identifier, state]);

  return [state, setState];
};

const ChatInput: React.FC<{}> = () => {
  const messageAdd = useMessageAddMutation();
  const authorNameInputRef = React.useRef<HTMLInputElement | null>(null);
  const [userName, setUserName] = useLocalStorageState("chat.userName");

  const onKeyDown = React.useCallback(
    (ev: React.KeyboardEvent) => {
      if (!authorNameInputRef.current) return;
      if (ev.key !== "Enter") return;
      messageAdd({
        authorName: userName,
        rawContent: authorNameInputRef.current.value,
      });
      authorNameInputRef.current.value = "";
    },
    [userName]
  );

  const onChangeUserName = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      setUserName(ev.target.value || "anon");
    },
    [setUserName]
  );

  const onSubmit = useCallback(
    (ev: React.FormEvent<HTMLFormElement>) => ev.preventDefault(),
    []
  );

  return (
    <form
      style={{ display: "flex", padding: 16, marginTop: "auto" }}
      onSubmit={onSubmit}
    >
      <div style={{ width: "100%", maxWidth: 150 }}>
        <label>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>Username</div>
          <input
            value={userName}
            onChange={onChangeUserName}
            style={{ width: "100%", padding: 12, borderWidth: 2 }}
          ></input>
        </label>
      </div>
      <div style={{ marginLeft: 16, flex: 1 }}>
        <label>
          <div style={{ fontWeight: "bold", marginBottom: 8 }}>
            Your Message
          </div>
          <input
            ref={authorNameInputRef}
            type="text"
            placeholder="Type in your message"
            style={{ width: "100%", padding: 12, margin: 0, borderWidth: 2 }}
            onKeyDown={onKeyDown}
          ></input>
        </label>
      </div>
      <div style={{ display: "flex", marginLeft: 16, borderWidth: 2 }}>
        <button style={{ marginTop: "auto", padding: 12, marginBottom: 1 }}>
          Send!
        </button>
      </div>
    </form>
  );
};

export const App: React.FC<{}> = () => {
  const environment = useEnvironment();
  React.useEffect(() => {
    requestSubscription<appSubscription>(environment, {
      subscription: AppSubscription,
      variables: {},
      updater: (store) => {
        const rootField = store.getRootField("live");
        if (!rootField) return;
        const patch = rootField.getLinkedRecords("patch");
        if (patch) applyPatch(store, patch as any);
      },
    });
  }, [environment]);

  return (
    <QueryRenderer<appQuery>
      query={AppQuery}
      environment={environment}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return (
          <Container>
            <Chat app={props} />
            <ChatInput />
          </Container>
        );
      }}
    />
  );
};
