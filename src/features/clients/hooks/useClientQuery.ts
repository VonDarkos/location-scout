
import { useQuery } from '@tanstack/react-query'
import getClient from '../api/getClient'

export default function useClientQuery(clientId:string|undefined) {

    const{data,isPending,isError,error}=useQuery({
        queryKey:["clients", clientId],
        queryFn:()=>{
            if(!clientId){
                throw new Error("Client id is required")
            }
            return getClient(clientId)
        },
        enabled:Boolean(clientId)
        
    })

  return {data,isPending,isError,error}
}
