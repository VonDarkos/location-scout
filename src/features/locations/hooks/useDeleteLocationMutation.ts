import { useMutation, useQueryClient } from '@tanstack/react-query'
import deleteLocation from '../api/deleteLocation'


export default function useDeleteLocationMutation() {
    const queryClient = useQueryClient()
    const deleteLocationMutation  = useMutation({
        mutationFn:deleteLocation,
            onSuccess:(_data,locationId)=>{
                queryClient.invalidateQueries({queryKey:["locations"]})
                queryClient.removeQueries({queryKey:["locations" , locationId]})
                // deleteLocation removes its ProjectLocations too: refresh ["projects", projectId, "locations"]
                queryClient.invalidateQueries({
                    predicate:(query)=>query.queryKey[0] === "projects" && query.queryKey[2] === "locations"
                })
            }
    })

  return deleteLocationMutation
}
