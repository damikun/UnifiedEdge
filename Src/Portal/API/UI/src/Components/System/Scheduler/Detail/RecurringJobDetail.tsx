import clsx from "clsx";
import { useMemo } from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../../Shared/Common";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { RecurringJobDetailDataFragment$key } from "./__generated__/RecurringJobDetailDataFragment.graphql";

export const RecurringJobDetailDataFragmentTag = graphql`
    fragment RecurringJobDetailDataFragment on Node 
    {
        ... on GQL_RecurringJob{
            id
            callName
            queue
            createdAt
            cron
            jobDetail {
                lastState
                methodCall
                parametrs {
                    name
                    value
                }
            }
            lastExecution
            lastJobState
            nextExecution
        }
    }
`;

type RecurringJobDetailProps = {
    dataRef:RecurringJobDetailDataFragment$key | null;
}

export function RecurringJobDetail({dataRef}:RecurringJobDetailProps){

    const data = useFragment(RecurringJobDetailDataFragmentTag, dataRef);

    const last_run_dt = useMemo(()=>{
        return GetLocalDate(data?.lastExecution);
    },[data]) 

    const next_run_dt = useMemo(()=>{
        return GetLocalDate(data?.nextExecution);
    },[data]) 

    return <div className="flex flex-col space-y-2 w-full max-w-2xl">
        <FieldGroup name="Info">
            {/* <DetailSection name="Type">Recurring</DetailSection> */}
            <FieldSection name="Name">{data?.callName}</FieldSection>
            <FieldSection name="Queue">{data?.queue}</FieldSection>
            <FieldSection name="Cron">{data?.cron}</FieldSection>
            <FieldSection name="Last state">{data?.lastJobState}</FieldSection>
            <FieldSection name="Last run">{last_run_dt}</FieldSection>
            <FieldSection name="Next run">{next_run_dt}</FieldSection>
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
            data?.jobDetail?.methodCall && <FieldGroup name="Handler">
                <div  className={clsx(
                "flex my-auto border text-gray-800 max-w-full font-normal",
                "border-gray-200 font-semibold relative group overflow-scroll"
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
