import getLocation from "../api/getLocation";
import { useQuery } from "@tanstack/react-query";



export default function useLocationQuery(locationId:string | undefined) {

    const{data,isPending,isError,error} = useQuery({queryKey:["locations",locationId],
        queryFn: () => {
            if (!locationId) {
                throw new Error("Location id is required");
                }
        return getLocation(locationId)},
        enabled: Boolean(locationId)})
    
 return{
    data,isPending,isError,error
  }
}
