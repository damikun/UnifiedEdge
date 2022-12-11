import { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Badge, { Badge_VARIANTS } from "../../../../UIComponents/Badged/Badge";
import { MqttNetLogLevel } from "./__generated__/MqttlogDetailQuery.graphql";
import { faExclamationCircle, faExclamationTriangle, faInfo } from "@fortawesome/free-solid-svg-icons";

export const MqttLogTypeData = graphql`
  fragment MqttLogTypeDataFragment on GQL_MqttServerLog
  {
    logLevel
  }
`;

type MqttLogTypeProps = {
    state: MqttNetLogLevel | undefined
  }
  
  type StateInfo = {
    variant: keyof typeof Badge_VARIANTS,
    icon:IconProp
    name:string
  }
  
  export function MqttLogTypeBadget({state}:MqttLogTypeProps){
  
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
      <div className="flex flex-row space-x-2 items-center">
        <FontAwesomeIcon  className="my-auto leading-none" icon={variant.icon} />
        <div className="my-auto leading-none truncate">{variant.name}</div>
      </div>
  
    </Badge>
  }
  