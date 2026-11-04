import { API_URL } from "../../../shared/config/api"
import type  { UpdateLocationInput } from "../types/location"
import type { Location } from "../types/location"
export default async function updateLocation(locationId:string, data:UpdateLocationInput):Promise<Location> {

    const response = await fetch(`${API_URL}/locations/${locationId}`, {method:"PATCH" , headers:{"Content-Type": "application/json"},body:JSON.stringify(data)})

    if(!response.ok){
        throw new Error("Error updating location")
    }

    const location:Location = await response.json()
  return location
}
