import React from "react";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Modal from "../../../UIComponents/Modal/Modal";
import SchedulerStatistics from "./SchedulerStatistics";
import Section from "../../../UIComponents/Section/Section";
import SchedulerFailedJobs from "./Failed/SchedulerFailedJobs";
import { SchedulerJobDetail } from "./Detail/SchedulerJobDetail";
import SchedulerSuccessJobs from "./Success/SchedulerSuccessJobs";
import SchedulerRecurringJobs from "./Recurring/SchedulerRecurringJobs"
import { useSearchParamHandler } from "../../../Hooks/useHandleSearchParam";
import { SchedulerViewQuery } from "./__generated__/SchedulerViewQuery.graphql";


const SchedulerViewQueryTag = graphql`
  query SchedulerViewQuery {
    ...SchedulerStatisticsFragment_jobsStatistic @defer
    ...SchedulerFailedJobsDataFragment @defer
    ...SchedulerSuccessJobsDataFragment @defer
    ...SchedulerRecurringJobsDataFragment @defer
  }
`;

export const DETAIL_ID_PARAM_NAME = "job_id";

export default React.memo(SchedulerView)

function SchedulerView() {

  const data = useLazyLoadQuery<SchedulerViewQuery>(
    SchedulerViewQueryTag,
    {},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, open, close] = useSearchParamHandler(DETAIL_ID_PARAM_NAME);

  return <>
    <Modal
      fallback={<div></div>}
      position="top"
      isOpen={isOpen}
      onClose={close}
      component={
        <SchedulerJobDetail/>
      }
    />

    <Section 
      name={"Statistics"}
      component={
        <SchedulerStatistics dataRef={data}/>
      }
    />
    <Section 
      name={"Recurring"}
      component={
        <SchedulerRecurringJobs dataRef={data}/>
      }
    />
    <Section 
      name={"Failed"}
      component={
        <SchedulerFailedJobs dataRef={data}/>
      }
    />
    <Section 
      name={"Success"}
      component={
        <SchedulerSuccessJobs dataRef={data}/>
      }
    />
  </>
}