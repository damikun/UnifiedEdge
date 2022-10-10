import clsx from "clsx";
import { FragmentRefs } from "relay-runtime";
import { RadioGroup } from "@headlessui/react";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../UIComponents/Badged/Badge";
import { FieldGroup, FieldSection } from "../Field/FieldHelpers";
import { useFragment, usePaginationFragment } from "react-relay";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AdapterSelectPaginationQuery } from "./__generated__/AdapterSelectPaginationQuery.graphql";
import { AdapterSelectDetailDataFragment$key } from "./__generated__/AdapterSelectDetailDataFragment.graphql";
import { AdapterSelectPaginationDataFragment$key } from "./__generated__/AdapterSelectPaginationDataFragment.graphql";


export const AdapterSelectPaginationDataFragment = graphql`
  fragment AdapterSelectPaginationDataFragment on Query 
  @argumentDefinitions(
    first: { type: Int }
    after: { type: String }
  ) @refetchable(queryName: "AdapterSelectPaginationQuery") {
    adapters(
      first: $first   
      after: $after
    ) @connection(key: "AdapterSelectPagination_adapters"){
      __id
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          name
          ...AdapterListItemDataFragment
          ...AdapterSelectDetailDataFragment
        }
      }
    }
  }
`;

type AdapterSelectProps = {
    dataRef:AdapterSelectPaginationDataFragment$key | null;
    selected_id:string|undefined,
    disable?:boolean
    error?:boolean
    onSelect(adapter:{
      readonly id: string;
      readonly name: string;
      readonly " $fragmentSpreads": FragmentRefs<"AdapterListItemDataFragment" | "AdapterSelectDetailDataFragment">;
  } | null): void
}

export function AdapterSelect({selected_id,error,dataRef,disable,onSelect}:AdapterSelectProps) {

    const adapters_paginated = usePaginationFragment<
        AdapterSelectPaginationQuery,
        AdapterSelectPaginationDataFragment$key
    >(AdapterSelectPaginationDataFragment, dataRef);

    var current = useMemo(() => {
        return adapters_paginated?.data?.adapters?.edges?.find(e=>e.node?.id === selected_id)!
    }, [selected_id,adapters_paginated.data])

    const [selected, setSelected] = useState(current?.node)

    useEffect(() => {
        if(selected?.id !== current?.node?.id){
            setSelected(current?.node)
        }
    }, [current,selected])

    const handleSelect = useCallback(
      (adapter:{
        readonly id: string;
        readonly name: string;
        readonly " $fragmentSpreads": FragmentRefs<"AdapterListItemDataFragment" | "AdapterSelectDetailDataFragment">;
    } | null) => {
        setSelected(adapter)
        onSelect(adapter)
      },
      [onSelect],
    )
    
    return (
    <div className={clsx("mx-auto w-full", error && "ring-red-500 ring-2 rounded-md")}>
        <RadioGroup disabled={disable} value={selected} onChange={handleSelect}>
        <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
        <div className="space-y-2">
            {adapters_paginated?.data?.adapters?.edges?.map((adapter,index) => (
            <RadioGroup.Option
                key={adapter?.node?.id}
                value={adapter?.node}
                className={({ active, checked }) =>clsx(
                    checked ? 'bg-blue-600 bg-opacity-75 text-white' : 'bg-white hover:bg-gray-100',
                    "relative flex  rounded-lg px-5 py-4 shadow-sm focus:outline-none border border-gray-100",
                    disable ? "opacity-50 transition-all delay-100 duration-300" : "cursor-pointer",
                )}
            >
                {({ active, checked }) => (
                <>
                    <div className="flex flex-row space-x-2 items-center overflow-hidden w-full">
                        <div className="flex items-center w-full">
                            <div className="text-sm space-y-3 flex flex-col">
                            <RadioGroup.Label
                                as="p"
                                className={`font-medium  ${
                                checked ? 'text-white' : 'text-gray-900'
                                }`}
                            >
                                {adapter?.node?.name}
                            </RadioGroup.Label>
                            <RadioGroup.Description
                                as="span"
                                className={`flex ${
                                checked ? 'text-sky-100' : 'text-gray-500'
                                }`}
                            >
                              <AdapterDescription dataRef={adapter?.node}/>

                            </RadioGroup.Description>
                            </div>
                        </div>
                        <div className="w-10 justify-center">
                        {(
                           checked && <div className={clsx("shrink-0 text-white")}>
                              <CheckIcon className="h-6 w-6" />
                            </div>
                        )}
                        </div>
      
                    </div>
                </>
                )}
            </RadioGroup.Option>
            ))}
        </div>
        </RadioGroup>
    </div>
    )
}

//-----------------------------

type CheckIconProps = {
    className:string | undefined
}

function CheckIcon({className}:CheckIconProps) {
    return (
        <svg viewBox="0 0 24 24" fill="none" className={className}>
        <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
        <path
            d="M7 13l3 3 7-7"
            stroke="#fff"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        </svg>
    )
}

//-----------------------------

export const AdapterSelectDetailDataFragmentTag = graphql`
  fragment AdapterSelectDetailDataFragment on GQL_Adapter 
  {
    id
    name
    interfaceType
    physicalAddress
    addresses {
        gatewayAddresses
        unicastAddresses
    }
  }
`;


type AdapterDescriptionProps = {
    dataRef:AdapterSelectDetailDataFragment$key | null;
}

function AdapterDescription({dataRef}:AdapterDescriptionProps){
    
    const data = useFragment(AdapterSelectDetailDataFragmentTag, dataRef);

    return <div className="flex flex-col">
    <FieldGroup>
      <FieldSection
      variant="flex-row"
      name="Type">
        <Badge size="thin" variant="secondarygray">
          {data?.interfaceType}
        </Badge>
      </FieldSection>

      {/* {
        data?.physicalAddress && <FieldSection
        variant="flex-row"
        name="Hw address">
          {data?.physicalAddress}
        </FieldSection>
      } */}

      {
        data?.addresses && <FieldSection
        multiline
        className="flex flex-col"
        variant="flex-row"
        name="Addresses">
            <>
            {
                data?.addresses?.unicastAddresses?.map((element,index)=>{
                    return <div
                    className="flex break-all overflow-hidden"
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
}
