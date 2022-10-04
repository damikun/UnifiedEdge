import { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Badge, { Badge_VARIANTS } from "../../../UIComponents/Badged/Badge";
import { EventType } from "./__generated__/SystemLogTypeDataFragment.graphql";
import { faExclamationCircle, faExclamationTriangle, faInfo } from "@fortawesome/free-solid-svg-icons";


export const SystemLogTypeData = graphql`
  fragment SystemLogTypeDataFragment on GQL_SystemEvent
  {
    type
  }
`;

type SystemLogTypeProps = {
    state: EventType | undefined
  }
  
  type StateInfo = {
    variant: keyof typeof Badge_VARIANTS,
    icon:IconProp
    name:string
  }
  
  export function SystemLogTypeBadget({state}:SystemLogTypeProps){
  
    var variant = useMemo(() => {
  
      // Default
      var variant: StateInfo = {
        variant: "ternaryblue",
        icon: faInfo,
        name: "Info"
      }
  
      switch (state) {
        case "ERROR": 
          variant = {
            variant: "ternaryred",
            icon: faExclamationCircle,
            name: "Error"
          }
          break;
    
        case "WARNING": 
          variant = {
            variant: "ternaryyellow",
            icon: faExclamationTriangle,
            name: "Warning"
          }
          break;
      }
  
      return variant;
    }, [state])
  
    
    return <Badge
      turncate
      border={false}
      className="text-xxs"
      size="thin"
      variant={variant.variant}
    >
      <div className="flex flex-row space-x-2 items-center break-all">
        <FontAwesomeIcon  className="my-auto leading-none" icon={variant.icon} />
        <div className="my-auto leading-none truncate break-all">{variant.name}</div>
      </div>
  
    </Badge>
  }
  