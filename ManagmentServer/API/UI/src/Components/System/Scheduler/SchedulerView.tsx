import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import React, { useCallback, useMemo } from "react";
import Modal from "../../../UIComponents/Modal/Modal";
import Section from "../../../UIComponents/Section/Section";
import SchedulerFailedJobs from "./Failed/SchedulerFailedJobs";
import { SchedulerJobDetail } from "./Detail/SchedulerJobDetail";
import SchedulerSuccessJobs from "./Success/SchedulerSuccessJobs";
import SchedulerRecurringJobs from "./Recurring/SchedulerRecurringJobs"
import { SchedulerViewQuery } from "./__generated__/SchedulerViewQuery.graphql";
import SchedulerStatistics from "./SchedulerStatistics";


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
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => 
    searchParams.get(DETAIL_ID_PARAM_NAME)!== null, [searchParams]
  );

  var job_id = searchParams.get(DETAIL_ID_PARAM_NAME);
  
  const handleModalClose = useCallback(() => {
    searchParams.delete(DETAIL_ID_PARAM_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  return <>
    <Modal
      fallback={<div></div>}
      position="top"
      isOpen={isOpen}
      onClose={handleModalClose}
      component={
        <SchedulerJobDetail jobId={job_id!}/>
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