import { useMemo, useState } from "react";
import { useLazyLoadQuery } from "react-relay";
import { JsonViewer } from "@textea/json-viewer";
import { graphql } from "babel-plugin-relay/macro";
import ModalContainer from "../../../UIComponents/Modal/ModalContainer";
import { FieldDivider, FieldGroup, FieldLabel, FieldSection } from "../../../Shared/Field/FieldHelpers";
import { ServerInfoConfigModalQuery } from "./__generated__/ServerInfoConfigModalQuery.graphql";


const ServerInfoConfigModalTag = graphql`
  query ServerInfoConfigModalQuery($id:ID!) {
    node(id: $id){
        ... on GQL_IServer {
            configState {
                isConfigMatch
                offlineTimeStamp
                onlineTimeStamp
                offlineConfig
                onlineConfig
            }
        }
      }
    }
`;

type ServerInfoConfigProps = {
    server_id:string
};

export default function ServerInfoConfigModal({server_id}:ServerInfoConfigProps){

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [id, setId] = useState(server_id)

    const data = useLazyLoadQuery<ServerInfoConfigModalQuery>(
        ServerInfoConfigModalTag,
        {id:id},
        {
            fetchPolicy: "store-and-network",
        },
    );

    const online_json = useMemo(() => 
        data.node?.configState?.onlineConfig ?
        JSON.parse(data.node?.configState?.onlineConfig!) : 
        data.node?.configState?.onlineConfig, [data]
    )
   
    const offline_json = useMemo(() => 
        data.node?.configState?.offlineConfig ?
        JSON.parse(data.node?.configState?.offlineConfig!) : 
        data.node?.configState?.offlineConfig, [data]
    )

    const offline_dt = useMemo(() => 
        data.node?.configState?.offlineTimeStamp ?
        new Date(data.node.configState.offlineTimeStamp).toLocaleString() : 
        "Unknown", [data]
    )

    const online_dt = useMemo(() => 
        data.node?.configState?.onlineTimeStamp ?
        new Date(data.node.configState.onlineTimeStamp).toLocaleString() : 
        "Unknown", [data]
    )

    return <ModalContainer label="Config">
    <div className="flex flex-col space-y-2 w-full max-w-2xl">

      <FieldGroup>
        <FieldSection name="State">{data.node?.configState?.isConfigMatch}</FieldSection>
        <FieldSection name="Online Timestamp">{online_dt}</FieldSection>
        <FieldSection name="Offline Timestamp">{offline_dt}</FieldSection>
      </FieldGroup>

      <FieldDivider/>
      
      {
       data.node?.configState?.isConfigMatch === false && <>
            <FieldGroup>
                <FieldLabel name="Online"/>
                <div className="rounded-md p-3 bg-gray-50 shadow-sm border border-gray-300">
                    <div className="flex overflow-hidden overflow-y-auto text-xs h-full break-all flex-wrap max-w-full">
                    <JsonViewer 
                        collapseStringsAfterLength={1000}
                        enableClipboard={false}
                        rootName={false}
                        value={online_json}
                    />
                    </div>
                </div>
            </FieldGroup>

            <FieldDivider/>
        </>
      }
      
      <FieldGroup>
        <FieldLabel name="Offline"/>
        <div className="rounded-md p-3 bg-gray-50 shadow-sm border border-gray-300">
          <div className="flex overflow-hidden overflow-y-auto text-xs h-full break-all flex-wrap max-w-full">
            <JsonViewer
                collapseStringsAfterLength={1000}
                enableClipboard={false}
                rootName={false}
                displayDataTypes={false }
                value={offline_json}
            />
          </div>
        </div>
      </FieldGroup>
      
    </div>
</ModalContainer>
}