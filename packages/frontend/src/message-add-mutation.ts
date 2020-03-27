import { useEnvironment } from "./relay-environment";
import { commitMutation } from "react-relay";
import { useCallback } from "react";
import graphql from "babel-plugin-relay/macro";

const MessageAddMutationDocument = graphql`
  mutation messageAddMutation($input: MessageAddInput!) {
    messageAdd(input: $input)
  }
`;

export const useMessageAddMutation = () => {
  const environment = useEnvironment();
  return useCallback(
    (input: { rawContent: string; authorName: string }) => {
      commitMutation(environment, {
        mutation: MessageAddMutationDocument,
        variables: { input },
      });
    },
    [environment]
  );
};
