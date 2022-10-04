import clsx from "clsx";
import { useMemo } from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { FailedJobDetail } from "./FailedJobDetail";
import { SuccessJobDetail } from "./SuccessJobDetail";
import { RecurringJobDetail } from "./RecurringJobDetail";
import { SchedulerJobDetailQuery } from "./__generated__/SchedulerJobDetailQuery.graphql";

const SchedulerJobDetailTag = graphql`
    query SchedulerJobDetailQuery($id:ID!) {
        node(id:$id) {
        __typename
        ...RecurringJobDetailDataFragment
        ...SuccessJobDetailDataFragment
        ...FailedJobDetailDataFragment
    }
  }
`;

type SchedulerJobDetailProps = {
    jobId:string
}

export function SchedulerJobDetail({jobId}:SchedulerJobDetailProps){

    const data = useLazyLoadQuery<SchedulerJobDetailQuery>(
        SchedulerJobDetailTag,
        {id:jobId},
        {
            fetchPolicy: "store-and-network",
            UNSTABLE_renderPolicy: "partial"
        },
      );

    const Component = useMemo(() => {
        switch (data.node?.__typename) {
            case "GQL_RecurringJob":
                return <RecurringJobDetail dataRef={data.node}/>
            case "GQL_SuccessJob":
                return <SuccessJobDetail dataRef={data.node}/>
            case "GQL_FailedJob":
                return <FailedJobDetail dataRef={data.node}/>      
            default:
                console.error(`Unsupported scheduler job type: ${data.node?.__typename}`)
                throw Error("Unsupported Job type")
        }
    }, [data])

    return <ModalContainer label="Job detail">
        {Component}
    </ModalContainer>
}

// ------------------------------------

    type ModalContainerProps = {
        children: React.ReactNode;
        label?:string
    }
    
    function ModalContainer({children,label}:ModalContainerProps){
        return <div className={clsx("flex flex-col w-full h-full",
        "bg-gray-50 z-50 rounded-md shadow-sm overflow-hidden")}>
            <ModalHeader label={label}/>
            <div className="p-5 xl:p-7">
                <div className="px-3 pb-2 w-fullflex-clex-col">
                    {children}
                </div>
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