
import { useMutation, useQueryClient } from "@tanstack/react-query"
import type { UpdateProjectInput } from "../types/project"
import updateProject from "../api/updateProject"


type UpdateProjectVariables = {
    projectId : string,
    data : UpdateProjectInput
}



export default function useUpdateProjectMutation() {

    const queryClient = useQueryClient()

    const {mutate,isPending,isError,error,isSuccess} = useMutation({
        mutationFn:({projectId,data}:UpdateProjectVariables)=>{
            return updateProject(projectId,data)
        },
        onSuccess:(_data,variables)=>{
            queryClient.invalidateQueries({queryKey:["projects"]});
            queryClient.invalidateQueries({queryKey:["projects", variables.projectId]})
        }
    })


  return {mutate,isPending,isError,error,isSuccess}
}
