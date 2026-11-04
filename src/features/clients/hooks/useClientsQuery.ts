import getClients from "../api/getClients"
import { useQuery } from "@tanstack/react-query"

export default function useClientsQuery() {


    const{data,isPending,isError,error}=useQuery({
        queryKey:["clients"],
        queryFn:getClients
    })
  return {data,isPending,isError,error}
}
