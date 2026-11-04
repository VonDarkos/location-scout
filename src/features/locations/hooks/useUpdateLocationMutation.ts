import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { UpdateLocationInput } from "../types/location";

type UpdateLocationVariables = {
  locationId: string;
  data: UpdateLocationInput;
};

import updateLocation from "../api/updateLocation";

export default function useUpdateLocationMutation() {

    const queryClient = useQueryClient()
    const{mutate,isPending,isError,error,isSuccess}=useMutation({
        mutationFn:({locationId,data}:UpdateLocationVariables)=>{
            return updateLocation(locationId,data)
        },
         onSuccess:(_data,variables)=>{
           queryClient.invalidateQueries({queryKey: ["locations"]});
          queryClient.invalidateQueries({queryKey:["locations", variables.locationId]}          
          )}
    })
  return {mutate, isPending ,isError,error,isSuccess}
}

