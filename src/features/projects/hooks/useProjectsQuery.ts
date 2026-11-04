//ABBIAMO RICAVATO I PROJECT DA GETPROJECTS, ADESSO LI FACCIAMO CONDIVISI CON LA QUERY E POI LI ESPORTIAMO

import { useQuery } from "@tanstack/react-query"
import getProjects from "../api/getProjects"

export default function useProjectsQuery() {

    const{data,isPending,isError,error} = useQuery(
        {queryKey:["projects"],queryFn:getProjects})
    
  return {data,isPending,isError,error}
}
