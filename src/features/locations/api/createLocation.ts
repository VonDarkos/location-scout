import { API_URL } from "../../../shared/config/api"
import type { CreateLocationInput,Location } from "../types/location";

export default async function createLocation(newLocation:CreateLocationInput):Promise<Location> {

    const response = await fetch(`${API_URL}/locations`, {method:"POST" , headers:{"Content-Type": "application/json"},body:JSON.stringify({...newLocation,createdAt:new Date().toISOString()})})

    if(!response.ok){
        throw new Error("Error creating location")
    }

    const data:Location = await response.json()

  return data
}
