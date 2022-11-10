import clsx from "clsx";
import { useFragment } from "react-relay";
import { useSearchParams } from "react-router-dom";
import React, { useCallback, useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import Modal from "../../../../UIComponents/Modal/Modal";
import Badge from "../../../../UIComponents/Badged/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointer } from "@fortawesome/free-solid-svg-icons";
import NetworkSelectAdapterModal from "./NetworkSelectAdapterModal";
import { FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { NetworkDefaultAdapterDataFragment$key } from "./__generated__/NetworkDefaultAdapterDataFragment.graphql";


export const NetworkDefaultAdapterDataFragmentTag = graphql`
  fragment NetworkDefaultAdapterDataFragment on Query 
  {
    defaultAdapter {
      adapter{
        id
        name

        interfaceType
        physicalAddress
        addresses {
          gatewayAddresses
          unicastAddresses
        }

      }
    }
  }
`;

export const IS_OPEN_NAME = "select_adapter"

export default React.memo(NetworkDefaultAdapter)

type NetworkDefaultAdapterProps = {
  dataRef:NetworkDefaultAdapterDataFragment$key | null | undefined;
}

function NetworkDefaultAdapter({dataRef}:NetworkDefaultAdapterProps) {

  const data = useFragment(NetworkDefaultAdapterDataFragmentTag, dataRef!);

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
      position="center"
      component={
        <NetworkSelectAdapterModal/>
      }
    />
    <div className="flex flex-col space-y-5">
        <div className="flex flex-row space-x-2 items-center">
          <div
            onClick={(handleModalOpen)} 
            className={clsx("p-2 px-3 cursor-pointer text-gray-800",
            "border-gray-300 rounded-md max-w-md border shadow-sm",
            "flex flex-row space-x-2 bg-gray-50 hover:bg-gray-200")}>
            <div className="truncate break-all underline font-semibold">
              Set default adapter
            </div>
            <div className="text-gray-500">
              <FontAwesomeIcon icon={faHandPointer}/>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <FieldGroup>

            {
              data.defaultAdapter.adapter?.name && <FieldSection
              variant="flex-row"
              name="Name">
                {data.defaultAdapter?.adapter?.name}
              </FieldSection>
            }

            <FieldSection
            variant="flex-row"
            name="Type">
              <Badge size="thin" variant="secondarygray">
                {data.defaultAdapter.adapter?.interfaceType}
              </Badge>
            </FieldSection>

            {
              data.defaultAdapter?.adapter?.physicalAddress && <FieldSection
              variant="flex-row"
              name="Hw address">
                {data.defaultAdapter?.adapter?.physicalAddress}
              </FieldSection>
            }

            {
            data.defaultAdapter.adapter?.addresses?.unicastAddresses && <FieldSection
            multiline
            variant="flex-row"
            name="Addresses">
              <>
                {
                data.defaultAdapter.adapter?.addresses?.unicastAddresses.map((element,index)=>{
                  return <div
                  className="flex break-all overflow-hidden font-mono"
                  key={index}>
                    {element}
                  </div>
                })
                }
              </>
            </FieldSection>
            }

          </FieldGroup>
      </div>
    </div>
    
  </>
}
