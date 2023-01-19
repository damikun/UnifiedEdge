import clsx from "clsx";
import NotesBar from "./NotesBar";
import { graphql } from "babel-plugin-relay/macro";
import Badge from "../../../UIComponents/Badged/Badge";
import Section from "../../../UIComponents/Section/Section";
import { GetServerDateTimeStr } from "../../../Shared/Common";
import { useCallback, useMemo, useTransition } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFragment, usePaginationFragment } from "react-relay";
import { faClock, faFlag } from "@fortawesome/free-solid-svg-icons";
import { NotesItemDataFragment$key } from "./__generated__/NotesItemDataFragment.graphql";
import { NotesPaginationFragment$key } from "./__generated__/NotesPaginationFragment.graphql";
import HorizontalInfinityScrollBody from "../../../UIComponents/Container/HorizontalInfinityScrollBody";
import HorizontalInfinityScrollContainer from "../../../UIComponents/Container/HorizontalInfinityScrollContainer";
import { NotesPaginationFragmentRefetchQuery } from "./__generated__/NotesPaginationFragmentRefetchQuery.graphql";


export const NotesPaginationFragment = graphql`
  fragment NotesPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 30 }
    after: { type: String }
    filter: {type: NoteFilter, defaultValue: ALL}
  )
  @refetchable(queryName: "NotesPaginationFragmentRefetchQuery") {
    __id
    notes(first: $first, after: $after, filter:$filter)
      @connection(key: "NotesPaginationFragmentConnection_notes") {
      __id
      edges {
        node {
          id
          ...NotesItemDataFragment
        }
      }
    }
  }
`;

type NotesProps = {
    dataRef: NotesPaginationFragment$key | null
}

export const NOTE_PARAM_NAME = "note_id"


export default function Notes({dataRef}:NotesProps){

    const pagination = usePaginationFragment<
    NotesPaginationFragmentRefetchQuery,
    NotesPaginationFragment$key
    >(NotesPaginationFragment, dataRef);
    
    const [searchParams, setSearchParams] = useSearchParams();

    const handleNoteDetail = useCallback(
      (client_id: string | null | undefined) => {
        searchParams.delete(NOTE_PARAM_NAME);
        if (client_id) {
          searchParams.append(NOTE_PARAM_NAME, client_id);
        }
        setSearchParams(searchParams);
      },
      [searchParams, setSearchParams]
    );
    
    return <Section 
      name="Notes"
      bar={<NotesBar/>}
      component={
        <HorizontalInfinityScrollContainer className="bg-gray-100 relative px-2 pr-5">
          <div className={clsx("flex absolute right-0 top-0 h-96 w-16",
          "whitespace-pre z-10 from-transparent to-gray-100",
          "bg-gradient-to-r")}/>
          <HorizontalInfinityScrollBody className="flex pr-16">
            {
              pagination?.data?.notes?.edges?.map((edge,index)=>{

                if(edge === null || edge === undefined){
                    return <></>
                }

                return <NotesItem 
                    key={edge.node?.id??index}
                    dataRef={edge.node}
                    onItemClick={handleNoteDetail}
                />
              })
            }
            <div className="w-16 h-full whitespace-pre"/>
          </HorizontalInfinityScrollBody>
        </HorizontalInfinityScrollContainer>
      }
    /> 
}


const NotesItemDataFragmentTag = graphql`
  fragment NotesItemDataFragment on GQL_Note {
    id
    name
    content
    isHighlighted
    isPrivate
    updated
    updatedby{
      firstName
      lastName
      userName
    }
  }
`;
type NotesItemProps = {
    dataRef: NotesItemDataFragment$key | null;
    onItemClick: (id:string|undefined)=>void
  }

function NotesItem({dataRef}:NotesItemProps){

  const data = useFragment(NotesItemDataFragmentTag, dataRef);
      
  //@ts-ignore
  const [_, startTransition] = useTransition({
    busyDelayMs: 2000,
  });

  const navigate = useNavigate();

  const handleClick = useCallback(
    (e:  React.MouseEvent<HTMLDivElement, MouseEvent>) => {

        e.preventDefault();
        e.stopPropagation();

        data?.id && startTransition(() => {
          navigate(`/Documents/Notes/Note/${data.id}`)
        });
    },
    [data, navigate],
  )

  const dt = useMemo(()=>{
    return GetServerDateTimeStr(data?.updated);
  },[data?.updated]) 

  const inicials = useMemo(() => {

    if(data?.updatedby?.firstName && data?.updatedby?.lastName){
      return `${Array.from(data?.updatedby?.firstName)[0]}${Array.from(data?.updatedby?.lastName)[0]}`
    }else{
      return `??`
    }

  }, [data?.updatedby])

  function randomNumberInRange(min:number, max:number) {
    // 👇️ get number between min (inclusive) and max (inclusive)
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function GetRotation(){
    switch (randomNumberInRange(-2,2)) {
      case -2:
      return "-rotate-2"
      case -1:
      return "-rotate-1"
      case 0:
      return ""
      case 1:
      return "rotate-1"
      case 2:
      return "rotate-2"
      default:
        break;
    }
  }

  function GetOffset(){
    switch (randomNumberInRange(-2,2)) {
      case -2:
      return "-mt-4"
      case -1:
      return "-mt-1"
      case 0:
      return ""
      case 1:
      return "mt-2"
      case 2:
      return "mt-4"
      default:
        break;
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const rotation = useMemo(() => GetRotation(), []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const offset = useMemo(() => GetOffset(), []);

  return <div onClick={handleClick} 
    className={clsx("flex flex-col h-32 w-60 bg-yellow-100 border",
    "shadow-sm rounded-lg p-2 px-3 m-1 mx-2 cursor-pointer hover:bg-yellow-200",
    "transition duration-300,",rotation, offset)}>
      <div className="flex flex-col h-full w-full pt-1">
        <div className={clsx("flex flex-row space-x-2 justify-between",
        "leading-none items-center")}>
          <Name name={data?.name} />
          <Highlighted state={data?.isHighlighted ?? false}/>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
    
        <Badge variant={data?.isPrivate?"primarypink":"white"}
          size="thin">
          {data?.isPrivate?"Private":"Public"}
        </Badge>
      
        <div className={clsx("flex flex-row justify-between space-x-2",
        "items-center text-gray-500")}>
          <Updated dt={dt}/>
          <Inicials data={inicials} />
        </div>
      </div>
    </div>
}

// --------------------------------

type InicialsProps = {
  data:string
}

function Inicials({data}:InicialsProps){
  return <div className={clsx("w-8 h-8 flex flex-row items-center",
  "border rounded-full bg-gray-50 shadow-sm whitespace-pre",
  "justify-center uppercase text-sm font-bold cursor-pointer",
  "select-none")}>
    {data}
  </div>
}

// --------------------------------

type UpdatedProps = {
  dt:string
}

function Updated({dt}:UpdatedProps){
  return <div className="flex">
  <div className={clsx("flex flex-row space-x-2 items-center text-xs",
  "bg-white rounded-md p-0.5 px-1.5 shadow-sm")}>
    <FontAwesomeIcon className="text-gray-400" icon={faClock}/>
    <div className="flex truncate break-all font-mono text-xs">
      {dt}
    </div>
  </div>
</div>
}

// --------------------------------

type HighlightedProps = {
  state:boolean
}

function Highlighted({state}:HighlightedProps){
  return <FontAwesomeIcon className={clsx(" pr-1.5 text-sm",
  state ? "text-red-500":"text-gray-400 opacity-40")}
  icon={faFlag}/>
}

// --------------------------------

type NameProps = {
  name:string | undefined | null
}

function Name({name}:NameProps){
  return <div className={clsx("block font-semibold text-gray-800",
  "break-all capitalize-first truncate first-letter:capitalize")}>
    {name ?? "Undefined"}
  </div>
}