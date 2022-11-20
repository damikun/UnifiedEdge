
import { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { faEthernet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Badge, { Badge_VARIANTS } from "../UIComponents/Badged/Badge";

export const MqttClientStateData = graphql`
  fragment MqttClientStateDataFragment on GQL_MqttClient
  {
    isConnected
  }
`;

  type MqttClientStateProps = {
      state: boolean | undefined
  }
    
  type StateInfo = {
    variant: keyof typeof Badge_VARIANTS,
    name:string
  }
  
  export function MqttClientStateBadget({state}:MqttClientStateProps){
  
    var variant = useMemo(() => {
  
      // Default
      var variant: StateInfo = {
        variant: "ternarygray",
        name: "N/A"
      }

      if(state === undefined){
        return variant;
      }
  
      switch (state) {
        case false: 
          variant = {
            variant: "ternarygray",
            name: "Offline"
          }
          break;
    
        case true: 
          variant = {
            variant: "ternarygreen",
            name: "Online"
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
        <FontAwesomeIcon icon={faEthernet} />
        <div>{variant.name}</div>
      </div>
  
    </Badge>
  }
  