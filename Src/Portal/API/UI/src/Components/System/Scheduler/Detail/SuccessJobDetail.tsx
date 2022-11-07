import clsx from "clsx";
import { useMemo } from "react";
import { useFragment } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { GetLocalDate } from "../../../../Shared/Common";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { SuccessJobDetailDataFragment$key } from "./__generated__/SuccessJobDetailDataFragment.graphql";

export const SuccessJobDetailDataFragmentTag = graphql`
    fragment SuccessJobDetailDataFragment on Node 
    {
        ... on GQL_SuccessJob {
            id
            name
            succeededAt
            totalDuration
            jobDetail {
                lastState
                parametrs{
                    name
                    value
                }
                methodCall
            }
        }
    }
`;

type SuccessJobDetailProps = {
    dataRef:SuccessJobDetailDataFragment$key | null;
}

export function SuccessJobDetail({dataRef}:SuccessJobDetailProps){

    const data = useFragment(SuccessJobDetailDataFragmentTag, dataRef);

    const completed_dt = useMemo(()=>{
        return GetLocalDate(data?.succeededAt);
    },[data]) 

    const duration = useMemo(()=>{
        if(data?.totalDuration){
            return `${data?.totalDuration / 1000}s`
        }else{
            return "?"
        }
    },[data]) 

    return <div className="flex flex-col space-y-2 w-full max-w-2xl">
        <FieldGroup name="Info">
            <FieldSection name="Name">{data?.name}</FieldSection>
            <FieldSection name="Duration">{duration}</FieldSection>
            <FieldSection name="Completed">{completed_dt}</FieldSection>
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
