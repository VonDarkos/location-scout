import { useMutation, useQueryClient } from "@tanstack/react-query"
import updateClient from "../api/updateClient"
import type {UpdateClientInput } from "../types/client"

type UpdateClientVariables = {
    clientId:string,
    data:UpdateClientInput
}

export default function useUpdateClientMutation() {

    const queryClient = useQueryClient()
    const{mutate,isPending,isError,error,isSuccess}= useMutation({
        mutationFn:({clientId,data}:UpdateClientVariables)=>{
            return updateClient(clientId,data)
        },
        onSuccess: (_data,variable)=>{
            queryClient.invalidateQueries({queryKey:["clients"]})
            queryClient.invalidateQueries({queryKey:["clients", variable.clientId]})
        }
    })

  return {mutate,isPending,isError,error,isSuccess}
}
