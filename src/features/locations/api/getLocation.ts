import { API_URL } from "../../../shared/config/api"

import type { Location } from "../types/location"
export default async function getLocation(locationId: string): Promise<Location> {

    const response = await fetch(`${API_URL}/locations/${locationId}`)

    if(!response.ok){
        throw new Error("Error loading location")
    }

    const data = await response.json()
    

  return data as Location
  
}
