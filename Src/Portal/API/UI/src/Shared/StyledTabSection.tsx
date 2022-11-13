import RouterTabList, { RouterTabItemType } from "../UIComponents/RouterTab/RouterTabList";

type StyledTabSectionProps = {
    tabs:RouterTabItemType[]
}

export default function StyledTabSection({tabs}:StyledTabSectionProps) {
    return <div className="flex sticky top-16 border-t border-y rounded-t-md bg-gray-50 shadow-sm w-full">
      <RouterTabList
        hoverEffect
        tabStyle={"h-11 hover:bg-transparent"}
        flexVariant="row"
        defaultIndex={0}
        Tabs={tabs} />
    </div>;
  }