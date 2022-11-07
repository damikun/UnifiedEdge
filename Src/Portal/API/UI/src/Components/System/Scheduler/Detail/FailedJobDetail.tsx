import clsx from "clsx";
import { useMemo } from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../../Shared/Common";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { FailedJobDetailDataFragment$key } from "./__generated__/FailedJobDetailDataFragment.graphql";

export const FailedJobDetailDataFragmentTag = graphql`
    fragment FailedJobDetailDataFragment on Node 
    {
        ... on GQL_FailedJob {
            exceptionDetails
            exceptionMessage
            exceptionType
            failedAt
            jobDetail {
                lastState
                methodCall
                parametrs{
                    name
                    value
                }
            }
            reason
            jobName
            inFailedState
        }
    }
`;

type FailedJobDetailProps = {
    dataRef:FailedJobDetailDataFragment$key | null;
}

export function FailedJobDetail({dataRef}:FailedJobDetailProps){

    const data = useFragment(FailedJobDetailDataFragmentTag, dataRef);

    const failed_dt = useMemo(()=>{
        return GetLocalDate(data?.failedAt);
    },[data]) 

    return <div className="flex flex-col space-y-2 w-full max-w-2xl">
        <FieldGroup name="Info">
            <FieldSection name="Name">{data?.jobName}</FieldSection>
            <FieldSection name="Failed">{failed_dt}</FieldSection>
            <FieldSection name="Reason">{data?.reason}</FieldSection>
        </FieldGroup>

        <FieldDivider/>
        
        {
            data?.jobDetail?.parametrs && <FieldGroup name="Parameters">
            {
                data?.jobDetail?.parametrs.map((e,index)=>{
                    return <FieldSection key={index} name={e.name}>
                        {e.value}
                    </FieldSection>
                })
            }
            </FieldGroup>
        }

        <FieldDivider/>

        {
            data?.exceptionType && <FieldGroup name="Exception">
                <FieldSection name="Type">{data?.exceptionType}</FieldSection>
                <FieldSection multiline name="Message">{data?.exceptionMessage}</FieldSection>
                <FieldSection
                    className={clsx("border p-2 lg:p-5 bg-gray-800 text-sm text-white text font-mono",
                    "rounded")}
                    variant="flex-col"
                    multiline
                    name="Details">
                        {data?.exceptionDetails}
                </FieldSection>
            </FieldGroup>
        }

        <FieldDivider/>

        {
            data?.jobDetail?.methodCall && <FieldGroup name="Handler">
                <div  className={clsx(
                "flex my-auto border text-gray-800 max-w-full font-normal",
                "border-gray-200 font-semibold relative group overflow-y-scroll overflow-x-hidden"
                )}>
                    <code>
                        <pre className={clsx("ql-editor break-all p-2 lg:p-5 font-semibold text-sm whitespace-pre-wrap")}
                            dangerouslySetInnerHTML={{ __html: data.jobDetail.methodCall }}
                        />
                    </code>
                </div>

            </FieldGroup>
        }

    </div>
}
