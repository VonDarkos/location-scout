import { useQuery } from '@tanstack/react-query'
import getLocations from '../api/getLocations'


export default function useLocationsQuery(){

    const{data,isPending,isError, error} = useQuery({queryKey:["locations"], queryFn:getLocations})

  return{
    data,isPending,isError,error
  }
}
