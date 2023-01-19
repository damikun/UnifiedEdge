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
        <HorizontalInfinityScrollContainer className="bg-gray-100">
          <HorizontalInfinityScrollBody>
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

  return <div onClick={handleClick} 
    className={clsx("flex flex-col h-32 w-60 bg-gray-50 border",
    "shadow-sm rounded-md p-2 px-3 m-1 cursor-pointer hover:bg-white",
    "transition duration-300")}>
      <div className="flex flex-col h-full w-full pt-1">
        <div className={clsx("flex flex-row space-x-2 justify-between",
        "leading-none items-center")}>
          <Name name={data?.name} />
          <Highlighted state={data?.isHighlighted ?? false}/>
        </div>
      </div>

      <div className="flex flex-col space-y-3">
    
        <Badge variant={data?.isPrivate?"primarypink":"primarygray"}
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
  return <div className={clsx("w-7 h-7 flex flex-row items-center",
  "border rounded-full bg-gray-100 shadow-sm whitespace-pre",
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
  "bg-gray-100 rounded-md p-0.5 px-1.5 shadow-sm")}>
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
  return <div className={clsx("block font-semibold",
  "break-all capitalize-first truncate first-letter:capitalize")}>
    {name ?? "Undefined"}
  </div>
}