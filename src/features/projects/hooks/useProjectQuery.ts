
import { useQuery } from '@tanstack/react-query'
import getProject from '../api/getProject'
export default function useProjectQuery(projectId:string | undefined) {

    const {data,isPending,isError,error} = useQuery({
        queryKey:["projects",projectId],
         queryFn: () => {       
                        if (!projectId) {
                            throw new Error("Project id is required");
                            }
                    return getProject(projectId)},
                    enabled: Boolean(projectId),})

  return {data,isPending,isError,error}
}
