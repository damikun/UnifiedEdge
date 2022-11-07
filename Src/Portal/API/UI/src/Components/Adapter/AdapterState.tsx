
import { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { faEthernet } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Badge, { Badge_VARIANTS } from "../../UIComponents/Badged/Badge"
import { AdapterState } from "./__generated__/AdapterStateDataFragment.graphql";

export const AdapterStateData = graphql`
  fragment AdapterStateDataFragment on GQL_Adapter
  {
    state
  }
`;

type AdapterStateProps = {
    state: AdapterState | undefined
  }
  
  type StateInfo = {
    variant: keyof typeof Badge_VARIANTS,
    name:string
  }
  
  export function AdapterStateBadget({state}:AdapterStateProps){
  
    var variant = useMemo(() => {
  
      // Default
      var variant: StateInfo = {
        variant: "ternarygray",
        name: "N/A"
      }
  
      switch (state) {
        case "DOWN": 
          variant = {
            variant: "ternaryred",
            name: "Down"
          }
          break;
    
        case "UP": 
          variant = {
            variant: "ternarygreen",
            name: "Up"
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
  