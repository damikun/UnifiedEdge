import clsx from "clsx";
import { useMemo } from "react";
import { LOG_PARAM_NAME } from "./SystemLogs";
import { useLazyLoadQuery } from "react-relay";
import { JsonViewer } from "@textea/json-viewer";
import { useSearchParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../Shared/Common";
import { useModalContext } from "../../../UIComponents/Modal/Modal";
import { SystemLogDetailQuery } from "./__generated__/SystemLogDetailQuery.graphql";
import { FieldDivider, FieldGroup, FieldSection } from "../../../Shared/Field/FieldHelpers";


const SystemLogDetailTag = graphql`
  query SystemLogDetailQuery($log_id:ID!) {
    systemLogById (log_id: $log_id){
      iD
      name
      timeStamp
      type
      json
    }
  }
`;

export default function SystemLogDetail(){

  const [searchParams, setSearchParams] = useSearchParams();

  var log_id = searchParams.get(LOG_PARAM_NAME);

  const data = useLazyLoadQuery<SystemLogDetailQuery>(
    SystemLogDetailTag,
    {log_id:log_id??""},
    {
      fetchPolicy: "store-and-network",
      fetchKey:"systemlogdetail"
    },
  );

  const modalCtx = useModalContext();

  const dt = useMemo(()=>{
    return GetLocalDate(data?.systemLogById.timeStamp);
  },[data]) 

  return <ModalContainer label="Event detail">
    <div className="flex flex-col space-y-2 w-60 lg:w-80">

      <FieldGroup>
        <FieldSection name="Type">{data.systemLogById.name}</FieldSection>
        <FieldSection name="Timestamp">{dt}</FieldSection>
      </FieldGroup>

      <FieldDivider/>

      <FieldGroup>
        <div className="rounded-md p-3 bg-gray-50 shadow-sm border border-gray-300">
          <div className="flex overflow-hidden overflow-y-auto text-xs h-full break-all flex-wrap max-w-full">
            <JsonViewer collapseStringsAfterLength={1000} enableClipboard={false} value={data.systemLogById.json}/>
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