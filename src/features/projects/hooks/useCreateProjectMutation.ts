import { useMutation, useQueryClient } from "@tanstack/react-query"
import createProject from "../api/createProject"


export default function useCreateProjectMutation() {

    const queryClient = useQueryClient()
    const{mutate,isPending,isError,error,isSuccess} = useMutation({
        mutationFn:createProject,
        onSuccess:()=>{queryClient.invalidateQueries({queryKey:["projects"]})}
    })
  return {mutate,isPending,isError,error,isSuccess}
}
