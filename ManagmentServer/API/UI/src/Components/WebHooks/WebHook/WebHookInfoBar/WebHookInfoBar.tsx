import clsx from "clsx";
import WebHookUid from "./WebHookName";
import { useFragment } from "react-relay";
import WebHookActiv from "./WebHookActiv";
import WebHookLastRun from "./WebHookLastRun";
import { graphql } from "babel-plugin-relay/macro";
import Card from "../../../../UIComponents/Card/Card";
import { WebHookInfoBarDataFragment$key } from "./__generated__/WebHookInfoBarDataFragment.graphql";


const WebHookInfoBarDataFragment = graphql`
    fragment WebHookInfoBarDataFragment on GQL_WebHook {
        ...WebHookNameDataFragment
        ...WebHookLastRunDataFragment
        ...WebHookActivDataFragment
    }
`;

type WebHookInfoBarProps = {
    dataRef:WebHookInfoBarDataFragment$key;
};

export default function WebHookInfoBar({dataRef}:WebHookInfoBarProps){

    const data = useFragment(WebHookInfoBarDataFragment, dataRef);

    return <div className={clsx("grid gap-2 grid-flow-row w-full",
        "grid-cols-1 2xl:grid-cols-4 lg:grid-cols-2 flex-wrap")}>
        
        <Card className="bg-gray-100">
            <WebHookUid dataRef={data}/>
        </Card>

        <Card className="bg-gray-100">
            <WebHookActiv dataRef={data}/>
        </Card>

        <Card className="bg-gray-100">
            <WebHookLastRun dataRef={data}/>
        </Card>
    </div>
}
