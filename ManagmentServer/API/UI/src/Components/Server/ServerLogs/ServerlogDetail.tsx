import clsx from "clsx";
import { useLazyLoadQuery } from "react-relay";
import { LOG_PARAM_NAME } from "./ServerLogs";
import { useSearchParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../Shared/Common";
import { useModalContext } from "../../../UIComponents/Modal/Modal";
import { ServerlogDetailQuery } from "./__generated__/ServerlogDetailQuery.graphql";

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
      <div className="px-3 pb-2 w-fullflex-clex-col">
        <div className="flex flex-row flex-nowrap space-x-2">
          <div className="font-semibold">Type:</div>
          <div className=" text-gray-700">{data.serverLogById.name}</div>
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