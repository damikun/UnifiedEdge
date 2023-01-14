import clsx from "clsx";
import { useFragment } from "react-relay";
import { useSearchParams } from "react-router-dom";
import React, { useCallback, useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import Modal from "../../../../UIComponents/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import MqttServerSetEndpointModal from "./MqttServerSetEndpointModal";
import { FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { MqttServerEndpointDataFragment$key } from "./__generated__/MqttServerEndpointDataFragment.graphql";


export const MqttServerEndpointDataFragmentTag = graphql`
  fragment MqttServerEndpointDataFragment on Query
  @argumentDefinitions(
    server_uid: { type: "ID!" }
  )
  {
    mqttServerEndpoint(server_uid:$server_uid) {
      id
      port
      iPAddress
      serverUid
    }
  }
`;

export const IS_OPEN_NAME = "select_adapter"

export default React.memo(MqttServerEndpoint)

type MqttServerEndpointProps = {
  dataRef:MqttServerEndpointDataFragment$key | null | undefined;
}

function MqttServerEndpoint({dataRef}:MqttServerEndpointProps) {

  const data = useFragment(MqttServerEndpointDataFragmentTag, dataRef!);

  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => {
    var param = searchParams.get(IS_OPEN_NAME)

    return param !== null && param === "true"
  }
   , [searchParams]
  );

  const handleModalClose = useCallback(() => {
    searchParams.delete(IS_OPEN_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleModalOpen = useCallback(
    () => {
      searchParams.delete(IS_OPEN_NAME);
      searchParams.append(IS_OPEN_NAME, "true");
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return <>
    <Modal
      isOpen={isOpen}
      onClose={handleModalClose}
      onConfirm={()=>{}}
      position="top"
      component={
        <MqttServerSetEndpointModal server_uid={data.mqttServerEndpoint.serverUid}/>
      }
    />
    <div className="flex flex-col space-y-5">

      <div className="flex flex-col space-y-2">
        <FieldGroup>
          <FieldSection
            variant="flex-row"
            name="Port">
            <div className="font-mono">
              {data?.mqttServerEndpoint.port}
            </div>
          </FieldSection>
          <FieldSection
            variant="flex-row"
            name="IP Address">
            <div className="font-mono">
              {data?.mqttServerEndpoint.iPAddress}
            </div>
          </FieldSection>
        </FieldGroup>
      </div>

      <div className="flex flex-row space-x-2 items-center">
        <div
          onClick={(handleModalOpen)} 
          className={clsx("p-2 px-3 cursor-pointer text-gray-800",
          "border-gray-300 rounded-lg max-w-md border shadow-sm",
          "flex flex-row space-x-2 bg-gray-200 hover:bg-gray-300")}>
            <div className="truncate break-all underline font-semibold">
              Set server endpoint
            </div>
            <div className="text-gray-500">
              <FontAwesomeIcon icon={faHandPointer}/>
            </div>
        </div>
      </div>

    </div>
  </>
}