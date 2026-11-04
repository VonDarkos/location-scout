import { useMutation, useQueryClient } from '@tanstack/react-query'
import createClient from '../api/createClient'


export default function useCreateClientMutation() {
    const queryClient = useQueryClient()
    
    const {mutate,isPending,isError,error} = useMutation({
        mutationFn: createClient,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey:["clients"]})
        }
    })
 
    return {mutate,isPending,isError,error}
}
