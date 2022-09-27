export {}
// import clsx from "clsx";
// import React, { useMemo } from "react";
// import { useFragment } from "react-relay";
// import { graphql } from "babel-plugin-relay/macro";
// import Section from "../../UIComponents/Section/Section";
// import { AdapterAddressDataFragment$key } from "./__generated__/AdapterAddressDataFragment.graphql";

// export const AdapterAddressDataFragment = graphql`
//   fragment AdapterAddressDataFragment on GQL_Adapter 
//   {
//     id
//     interfaceType
//     name
//     state
//     supportsIpv4
//     supportsIpv6
//     physicalAddress
//     description
//     statistic {
//       bytesReceived
//       bytesSent
//     }
//     addresses {
//       dhcpServerAddresses
//       dnsAddresses
//       gatewayAddresses
//       multicastAddresses
//       unicastAddresses
//     }
//   }
// `;

// export default React.memo(AdapterAddress)

// type AdapterAddressProps = {
//   dataRef:AdapterAddressDataFragment$key | null;
// }

// function AdapterAddress({dataRef}:AdapterAddressProps) {

//   const data = useFragment(AdapterAddressDataFragment, dataRef);

//   var supported_ip_prot = useMemo(() => {

//     var protocols:string[] = [];

//     if(data?.supportsIpv4){
//       protocols.push("IPv4");
//     }

//     if(data?.supportsIpv6){
//       protocols.push("IPv6");
//     }

//     var str:string = ""

//     protocols.forEach((e,index)=>{
//       if(index === 0){
//         str = `${e}`
//       }else{
//         str = `${str}, ${e}`
//       }
//     });

//     return str;

//   }, [data])
  
//   return <Section 
//     name={"Addresses"}
//     component={
//       <div className={clsx("flex bg-gray-100 flex-col w-full pt-4",
//       "border border-gray-200 rounded-sm shadow-sm pt-2 p-5 space-y-2")}>
//         <Value name="Interface type" value={data?.interfaceType}/>
//         <Value name="Supported IP protocol" value={supported_ip_prot}/>
//         <Value name="Physical address" value={data?.physicalAddress}/>
//         <ValueArr name="DHCP address" value={data?.addresses.dhcpServerAddresses}/>
//         <ValueArr name="DNS addresses" value={data?.addresses.dnsAddresses}/>
//         <ValueArr name="Gateway addresses" value={data?.addresses.gatewayAddresses}/>
//         <ValueArr name="Multicast addresses" value={data?.addresses.multicastAddresses}/>
//         <ValueArr name="Unicast addresses" value={data?.addresses.unicastAddresses}/>
//       </div>
//     }
//     />
// }

// // --------------------------------

// type ValueProps = {
//   name:string
//   value:string | undefined
// }

// function Value({name,value}:ValueProps){
//   return <div className="flex flex-row space-x-5">
//     <div className="font-semibold w-40">{`${name}:`}</div>
//     <div className="font-mono truncate text-gray-600">{value}</div>
//   </div>
// }

// type ValueArrProps = {
//   name: string
//   value: ReadonlyArray<string|undefined> | undefined
// }

// function ValueArr({name,value}:ValueArrProps){
//   return <div className="flex flex-row space-x-5">
//     <div className="font-semibold w-40">{`${name}:`}</div>
//     <div className="flex flex-col space-y-1 font-mono">
//       {
//         value?.map(e=>{
//           return <div className="truncate text-gray-600">{e}</div>
//         })
//       }
//     </div>
//   </div>
// }