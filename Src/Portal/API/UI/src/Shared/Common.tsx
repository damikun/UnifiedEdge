import { Badge_VARIANTS } from "../UIComponents/Badged/Badge";

export type GQL_ServerState = "DISABLED" | "RESTARTING" | "STARTED" | "STARTING" | "STOPPED" | "STOPPING" | "UNDEFINED" | "%future added value";

export function GetMqttServerStateBadgetVariant(state:GQL_ServerState| undefined): keyof typeof Badge_VARIANTS{
    if(state === "STARTED"){
        return "secondarygreen"
    }else if(state === "RESTARTING" || state === "STARTING" || state === "STOPPING"){
        return "secondaryellow"
    }else if(state === "STOPPED"){
        return "secondaryred"
    }else{
        return "secondarygray"
    }
}

//-----------------------------------

export function GetUptimeString(
    days:number|null|undefined,
    hours:number|null|undefined,
    minutes:number|null|undefined):string {

    if(days && days > 0){
        return `${days}d ${hours}h ${minutes}m`
    }else if(hours && hours > 0){
        return `${hours}h ${minutes}m`
    }else if(minutes){
        return `${minutes}m`
    }else{
        return "Just started"
    }
}

//-----------------------------------

export function GetServerDateTimeStr(gql_date:any){
    var date = new Date(gql_date);

    var utc_day = FNum(date.getDate());
    var utc_month = FNum(date.getUTCMonth()+1)

    var utc_year = FNum(date.getUTCFullYear())

    var utc_hour = FNum(date.getUTCHours())
    var utc_minute = FNum(date.getUTCMinutes())

    return `${utc_month}/${utc_day} ${utc_year} ${utc_hour}:${utc_minute}`
} 

export function GetLocalDate(gql_date:any){

    if(gql_date === null || gql_date === undefined){
        return "N/A"
    }
    
    try{
        var date = new Date(gql_date);

        if(!date){
            return "N/A" 
        }
    
        return date.toLocaleString()
    }catch{
        return "N/A"
    }
} 

function FNum(num:number){
    return num>0 && num <10 ? `0${num}`: num;
}
