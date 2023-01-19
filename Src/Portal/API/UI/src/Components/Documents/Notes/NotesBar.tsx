import { useNavigate } from "react-router";
import { useCallback, useTransition } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";


export default function NotesBar(){

  const navigate = useNavigate();

  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const handleNew = useCallback(
    () => {
      startTransition(() => {
          navigate("/Documents/Notes/New")
      });
    },
    [navigate], 
  )

  return <>
    <StayledButton 
      onMobileIconOnly={false}
      variant="primaryblue"
      onClick={handleNew}
      iconLeft={faPlus}>
        Add
    </StayledButton>
  </> 
}
