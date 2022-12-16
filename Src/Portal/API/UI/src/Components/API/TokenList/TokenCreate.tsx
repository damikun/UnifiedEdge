import { useFormik } from "formik";
import {useMutation } from "react-relay";
import React, { useMemo, useState }  from "react";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../Shared/Common";
import { useTokenListCtx } from "./TokenListCtxProvider";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../Utils/Validation";
import { FormInput } from "../../../UIComponents/Form/FormInput";
import { useModalContext } from "../../../UIComponents/Modal/Modal";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import FormSelect, { FormSelectOption } from "../../../UIComponents/Form/FormSelect";
import { FieldDivider, FieldGroup, FieldSection } from "../../../Shared/Field/FieldHelpers";
import { GenerateApiTokenInput, TokenCreateMutation } from "./__generated__/TokenCreateMutation.graphql";


const TokenCreateMutationTag = graphql`
  mutation TokenCreateMutation(
      $input: GenerateApiTokenInput!
      $connections: [ID!]!
    ){
      generateApiToken(input: $input) {
      ... on GenerateApiTokenPayload {
        gQL_TokenResponse {
          handle
          token @prependNode(
            connections: $connections
            edgeTypeName: "GQL_Token"
          ){
            id
            description
            expiration
            ...TokenListItemDataFragment
          }
        }
        errors {
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
  }`


export default React.memo(CreateNewToken)

type TokenType  =  {
  readonly handle: string | null;
  readonly token: {
    readonly description: string;
    readonly expiration: any | null;
    readonly id: string;
  };
} | null;

function CreateNewToken(){

  const [
    commit,
    isInFlight,
  ] = useMutation<TokenCreateMutation>(TokenCreateMutationTag);

  const conCtx = useTokenListCtx();

  const toast = useToast();

  const [generatedToken, setGeneratedToken] = useState<TokenType|null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const modalCtx = useModalContext();
  
  const formik = useFormik<GenerateApiTokenInput>({
    initialValues: {
      description:"",
      lifetime:"DAY",
      scope:"VIEW",
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              description:values.description,
              lifetime:values.lifetime,
              scope:values.scope,
            },
            connections: [conCtx?.connection_id] ?? [],
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.generateApiToken?.gQL_TokenResponse){
              setGeneratedToken(
                response?.generateApiToken?.gQL_TokenResponse
              )
            }

            HandleErrors(toast, response?.generateApiToken?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        description: [
          is.required(),
          is.minLength(3),
        ],
      });
    },

    validateOnChange: false

  });

  const dt = useMemo(() => {
    return GetLocalDate(generatedToken?.token?.expiration);
  }
  , [generatedToken])
  
  return !generatedToken ? <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full space-y-2">
      
    <FormInput
      label="Description"
      id="description"
      focusOnMount
      disabled={isInFlight}
      error={formik.errors.description}
      value={formik.values.description}
      onChange={formik.handleChange}
    />

    <FormSelect
      label="Scope"
      id="scope"
      error={formik.errors.scope}
      value={formik.values.scope}
      onChange={formik.handleChange}
    >
      <FormSelectOption value="VIEW">View</FormSelectOption>
      <FormSelectOption value="VIEW_AND_WRITE">Vire/Write</FormSelectOption>
    </FormSelect>

    <FormSelect
      label="Lifetime"
      id="lifetime"
      error={formik.errors.lifetime}
      value={formik.values.lifetime}
      onChange={formik.handleChange}
    >
      <FormSelectOption value="HOUR">Hour</FormSelectOption>
      <FormSelectOption value="DAY">Day</FormSelectOption>
      <FormSelectOption value="WEEK">7 Days</FormSelectOption>
      <FormSelectOption value="MONTH">30 Days</FormSelectOption>
      <FormSelectOption value="YEAR">Year</FormSelectOption>
    </FormSelect>

    <div className="pt-5">
      <div className="mb-6 text-center h-10 flex-1">
        <StayledButton
          isloading={isInFlight}
          variant="secondaryblue"
          disabled={isInFlight}
          className="flex-1 my-auto w-full"
          type="submit"
        >
          <div className="mx-auto my-auto">
            Generate
          </div>
        </StayledButton>
      </div>
    </div>

  </form> :
  
  <div className="flex flex-col space-y-2 w-full max-w-2xl">

    <FieldGroup>
      <FieldSection name="Description">
        {generatedToken.token.description}
      </FieldSection>
      <FieldSection name="Expiration">{dt}</FieldSection>
    </FieldGroup>

    <FieldGroup>
      <FieldSection variant="flex-col" className="select-all" multiline name="Token">
        <span className="flex break-all p-2 border h-20 overflow-hidden items-center">
          {generatedToken.handle}
        </span>
      </FieldSection>
    </FieldGroup>

</div>
}

