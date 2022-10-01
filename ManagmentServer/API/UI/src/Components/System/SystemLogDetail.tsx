import clsx from "clsx";
import { useMemo } from "react";
import { LOG_PARAM_NAME } from "./SystemLogs";
import { useLazyLoadQuery } from "react-relay";
import { useSearchParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../Shared/Common";
import { useModalContext } from "../../UIComponents/Modal/Modal";
import { SystemLogDetailQuery } from "./__generated__/SystemLogDetailQuery.graphql";


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
    <div className="px-3 pb-2 w-fullflex-clex-col">
      <div className="flex flex-row flex-nowrap space-x-2">
        <div className="font-semibold">Type:</div>
        <div className=" text-gray-700">{data.systemLogById.name}</div>
      </div>
      <div className="flex flex-row flex-nowrap space-x-2">
        <div className="font-semibold">DateTime:</div>
        <div className=" text-gray-700">{dt}</div>
      </div>
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
  "px-2 py-1 font-semibold text-gray-800 shadow-sm")}>
    {label}
  </div>
}