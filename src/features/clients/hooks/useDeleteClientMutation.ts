import { useMutation, useQueryClient } from '@tanstack/react-query'

import deleteClient from '../api/deleteClient'

export default function useDeleteClientMutation() {
    const queryClient = useQueryClient()
     const{mutate,isPending,isError,error,isSuccess} = useMutation({
        mutationFn:deleteClient,
        onSuccess:(_data,clientId)=>{
            queryClient.invalidateQueries({queryKey:["clients"]})
            queryClient.removeQueries({queryKey:["clients", clientId]})
            queryClient.invalidateQueries({queryKey:["projects"]})
        }
     })

  return {mutate,isPending,isError,error,isSuccess}
}
