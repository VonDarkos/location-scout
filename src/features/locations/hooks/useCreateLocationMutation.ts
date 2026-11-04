import { useMutation,useQueryClient } from "@tanstack/react-query";
import createLocation from "../api/createLocation";

export default function useCreateLocationMutation() {
    const queryClient = useQueryClient()
    const {mutate,isPending,isError,error,isSuccess} = useMutation({
            mutationFn:createLocation,
            onSuccess:()=>{queryClient.invalidateQueries({queryKey:["locations"]})}
        })
  return {mutate,isPending,isError,error,isSuccess}
}