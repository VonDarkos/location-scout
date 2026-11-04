import { useMutation, useQueryClient } from "@tanstack/react-query"
import updateProjectLocation from "../api/updateProjectLocation"
import type { UpdateProjectLocationInput } from "../../../shared/types/projectLocation"

type UpdateProjectLocationVariables = {

    relationId:string,
    data:UpdateProjectLocationInput
}



export default function useUpdateProjectLocationMutation() {

    const queryClient = useQueryClient()

    const {mutate,isPending,isError,error,isSuccess} = useMutation({
        mutationFn: ({relationId,data}:UpdateProjectLocationVariables)=>{
            return updateProjectLocation(relationId,data)
        },
        onSuccess:(updatedRelation)=>{
            queryClient.invalidateQueries({queryKey:["projects", updatedRelation.projectId, "locations"]})
        }
            
    })

  return {mutate,isPending,isError,error,isSuccess}
}
