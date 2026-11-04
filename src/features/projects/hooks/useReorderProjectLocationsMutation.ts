import { useMutation, useQueryClient } from "@tanstack/react-query"
import reorderProjectLocations from "../api/reorderProjectLocations"
import type { ProjectLocationOrderUpdate } from "../api/reorderProjectLocations"

type ReorderProjectLocationsVariables = {
    projectId:string,
    updates:ProjectLocationOrderUpdate[]
}

export default function useReorderProjectLocationsMutation() {

    const queryClient = useQueryClient()

    const {mutate,isPending,isError,error,isSuccess} = useMutation({
        mutationFn: ({updates}:ReorderProjectLocationsVariables)=>{
            return reorderProjectLocations(updates)
        },
        onSuccess:(_data,variables)=>{
            queryClient.invalidateQueries({queryKey:["projects", variables.projectId, "locations"]})
        }
    })

  return {mutate,isPending,isError,error,isSuccess}
}
