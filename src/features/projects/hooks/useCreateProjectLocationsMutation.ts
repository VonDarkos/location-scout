import { useMutation, useQueryClient } from "@tanstack/react-query"
import createProjectLocations from "../api/createProjectLocations"


    type CreateProjectLocationsVariables = {
            projectId:string,
            locationIds:string[]
        }

      

export default function useCreateProjectLocationsMutation() {

    const queryClient = useQueryClient()

    const {mutate,isPending,isError,error,isSuccess} = useMutation({
            mutationFn: ({projectId,locationIds}:CreateProjectLocationsVariables)=>{
                return createProjectLocations(projectId,locationIds)
            },
            onSuccess:(_data,variables)=>{
                queryClient.invalidateQueries({queryKey:["projects", variables.projectId, "locations"]})

            }
    })

  return {mutate,isPending,isError,error,isSuccess}
}
