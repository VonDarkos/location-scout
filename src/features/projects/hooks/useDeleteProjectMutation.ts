import { useMutation, useQueryClient } from '@tanstack/react-query'
import deleteProject from '../api/deleteProject'


export default function useDeleteProjectMutation() {
    
    const queryClient = useQueryClient()
    const deleteProjectMutation = useMutation({
        mutationFn:deleteProject,
        onSuccess:(_data,projectId)=>{
            queryClient.invalidateQueries({queryKey:["projects"]})
            queryClient.removeQueries({queryKey:["projects", projectId]})
        }
    })
    return deleteProjectMutation
}
