import clsx from "clsx";
import RouterTabList, { RouterTabItemType } from "../UIComponents/RouterTab/RouterTabList";

type StyledTabSectionProps = {
    tabs:RouterTabItemType[]
}

export default function StyledTabSection({tabs}:StyledTabSectionProps) {
    return <div className={clsx("flex sticky top-16 border-t border-y",
    "bg-gray-50 shadow-sm w-full z-10")}>
      <RouterTabList
        hoverEffect
        tabStyle={"h-11 hover:bg-transparent"}
        flexVariant="row"
        defaultIndex={0}
        Tabs={tabs} />
    </div>;
  }