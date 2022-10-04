import clsx from "clsx";
import { useLazyLoadQuery } from "react-relay";
import { LOG_PARAM_NAME } from "./ServerLogs";
import { JsonViewer } from "@textea/json-viewer";
import { useSearchParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../Shared/Common";
import { useModalContext } from "../../../UIComponents/Modal/Modal";
import { ServerlogDetailQuery } from "./__generated__/ServerlogDetailQuery.graphql";
import { FieldDivider, FieldGroup, FieldSection } from "../../../Shared/Field/FieldHelpers";


const ServerLogDetailTag = graphql`
  query ServerlogDetailQuery($log_id:ID!) {
    serverLogById(log_id: $log_id){
        ... on GQL_IServerEvent {
        iD
        name
        asJson
        timeStamp
      }
    }
  }
`;

export default function ServerLogDetail(){

  const [searchParams, setSearchParams] = useSearchParams();

  var log_id = searchParams.get(LOG_PARAM_NAME);

  const data = useLazyLoadQuery<ServerlogDetailQuery>(
    ServerLogDetailTag,
    {log_id:log_id??""},
    {
      fetchPolicy: "store-and-network",
    },
  );

  const modalCtx = useModalContext();

  const dt = GetLocalDate(data?.serverLogById.timeStamp);

  return <ModalContainer label="Event detail">
    <div className="flex flex-col space-y-2 w-full max-w-2xl">

      <FieldGroup>
        <FieldSection name="Type">{data.serverLogById.name}</FieldSection>
        <FieldSection name="Date">{dt}</FieldSection>
      </FieldGroup>

      <FieldDivider/>
      
      <FieldGroup>
        <div className="rounded-md p-3 bg-gray-50 shadow-sm border border-gray-300">
          <div className="flex overflow-hidden overflow-y-auto text-xs h-full break-all flex-wrap max-w-full">
            <JsonViewer collapseStringsAfterLength={1000} enableClipboard={false} value={data.serverLogById.asJson}/>
          </div>
        </div>
      </FieldGroup>
      
      </div>
    </ModalContainer>
}

type ModalContainerProps = {
  children: React.ReactNode;
  label?:string
}

function ModalContainer({children,label}:ModalContainerProps){
  return <div className={clsx("flex flex-col w-full h-full",
    "bg-gray-50 z-50 rounded-md shadow-sm overflow-hidden")}>
    <ModalHeader label={label}/>
    <div className="p-5 xl:p-7">
      {children}
    </div>
  </div>
}

type ModalHeaderProps = {
  label?:string
}

function ModalHeader({label}:ModalHeaderProps){
  return <div className={clsx("w-full bg-gray-200 overflow-hidden",
  "px-5 py-2 font-bold text-gray-500 shadow-sm")}>
    {label}
  </div>
}