import { API_URL } from "../../../shared/config/api"
import type { Location } from "../types/location"

export default async function getLocations(): Promise<Location[]> {
    const response = await fetch(`${API_URL}/locations`)
    
    if (!response.ok) {
        throw new Error("Error loading locations")
    }
    
    const data = await response.json()
    
    return data as Location[] 
}