import { useQuery } from '@tanstack/react-query'
import getProjectLocations from '../api/getProjectLocations'

export default function useProjectLocationsQuery(projectId:string | undefined) {

        const {data,isPending,isError,error} = useQuery({
            queryKey:["projects", projectId, "locations"],
            queryFn: () => {       
                            if (!projectId) {
                                throw new Error("Project id is required");
                             }
                            return getProjectLocations(projectId)},

            enabled: Boolean(projectId)
        })

  return {data,isPending,isError,error}
}
