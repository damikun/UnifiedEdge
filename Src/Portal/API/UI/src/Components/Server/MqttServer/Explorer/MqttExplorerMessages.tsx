import React from "react";
import Section from "../../../../UIComponents/Section/Section";
import MqttExplorerMessagesBarBar from "./MqttExplorerMessagesBar";


export default React.memo(MqttExplorerMessages)

function MqttExplorerMessages() {

  return <>
    <Section 
      name={"Messages"}
      bar={<MqttExplorerMessagesBarBar/>}
      component={
        <div>Messages view</div>
      }
    />
  </>
}