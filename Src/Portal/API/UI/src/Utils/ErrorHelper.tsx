import { ToastContextType } from "../UIComponents/Toast/ToastProvider";

export function HandleErrors(
  toast: ToastContextType | undefined,
  errors: ReadonlyArray<{
    readonly __typename: string;
    readonly errors?: ReadonlyArray<{
      readonly message: string | null;
      readonly property: string | null;
    }> | null;
    readonly message?: string;
  }> | null
) {
  if (errors) {
    errors?.forEach((error) => {

      if(error.__typename === "ValidationError"){

        if(error?.errors){
          error?.errors?.forEach(err => {
            err?.message && toast?.pushError(err.message);
          });
        }
      }else{
        error?.message && toast?.pushError(error.message);
      }
    });
  }
}
