import { TOKEN_PARAM_NAME } from "./TokenList";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import { GetLocalDate } from "../../../Shared/Common";
import { useCallback, useMemo, useState } from "react";
import { useTokenListCtx } from "./TokenListCtxProvider";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useLazyLoadQuery, useMutation } from "react-relay";
import { useModalContext } from "../../../UIComponents/Modal/Modal";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../UIComponents/Modal/ModalContainer";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import { TokenItemDetailQuery } from "./__generated__/TokenItemDetailQuery.graphql";
import { FieldDivider, FieldGroup, FieldSection } from "../../../Shared/Field/FieldHelpers";
import { TokenItemDetailRemoveMutation } from "./__generated__/TokenItemDetailRemoveMutation.graphql";


const TokenItemDetailTag = graphql`
  query TokenItemDetailQuery($token_id:ID!) {
    tokenById(token_id: $token_id) {
      id
      description
      expiration
    }
  }
`;

const TokenItemDetailRemoveMutationTag = graphql`
  mutation TokenItemDetailRemoveMutation(
    $input: RevokeApiTokenInput!,
    $connections: [ID!]!
    ) {
      revokeApiToken(input: $input) {
      ... on RevokeApiTokenPayload {
        gQL_Token{
          id @deleteEdge(connections: $connections)
        }
        errors{
          __typename

          ... on ValidationError{
            errors{
              property
              message
            }
          }

          ... on ResultError{
            message
          }
        }
      }
    }
}
`

export default function TokenItemDetail(){

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const [token_id] = useState(searchParams.get(TOKEN_PARAM_NAME) as string)

  const data = useLazyLoadQuery<TokenItemDetailQuery>(
    TokenItemDetailTag,
    {
      token_id:token_id,
    },
    {
      fetchPolicy: "store-and-network",
      fetchKey:"userTokenDetailFetchKey"
    },
  );

  const [
    commit_remove,
    isInFlight_remove,
  ] = useMutation<TokenItemDetailRemoveMutation>(
    TokenItemDetailRemoveMutationTag
  );

  const modalCtx = useModalContext();

  const toast = useToast();

  const ctx = useTokenListCtx();
  
  const handleRemove = useCallback(
    () => {

      return !isInFlight_remove  && commit_remove({
        variables: {
          input: {
            token_id: token_id as string
          },
          connections: ctx?.connection_id ? [ctx?.connection_id]:[]
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.revokeApiToken?.gQL_Token){
            modalCtx.close()
          }
          HandleErrors(toast, response?.revokeApiToken?.errors);
        },
      });
    },
    [isInFlight_remove,
      token_id,
      commit_remove,
      toast,
      ctx.connection_id,
      modalCtx
    ]
  );

  const dt = useMemo(() => {
    return GetLocalDate(data?.tokenById.expiration);
  }
  , [data])


  return <ModalContainer label="Token">
    <div className="flex flex-col space-y-5 max-w-2xl md:w-96">
      <FieldGroup>
        <FieldSection name="Description">
          {data.tokenById.description}
        </FieldSection>
        <FieldSection name="Expiration">
          {dt}
        </FieldSection>
      </FieldGroup>

      <FieldDivider/>

      <FieldSection multiline name="Revocation">
        <div className="max-w-lg">
          <StayledButton
            variant="error"
            isloading={isInFlight_remove}
            iconLeft={faTrash}
            size="normal"
            onClick={handleRemove}>
              Revoke
          </StayledButton>
        </div>
      </FieldSection>
    </div>
  </ModalContainer>
}