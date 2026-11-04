import { API_URL } from "../../../shared/config/api"
import type { ProjectLocation } from "../../../shared/types/projectLocation"

export default async function deleteLocation(locationId:string):Promise<void> {
    
    
    const response = await 
    fetch(`${API_URL}/projectLocations?locationId=${locationId}`)
    if(!response.ok){
        throw new Error("Error loading project-location relations")
    }
    const projectLocations:ProjectLocation[] = await response.json()

    const deleteResponses  = await Promise.all(
        projectLocations.map((relation)=>
        fetch(`${API_URL}/projectLocations/${relation.id}`,{method:"DELETE"},))
    )

    const hasDeleteError = deleteResponses.some((response) => !response.ok)

    if(hasDeleteError){
        throw new Error("Error deleting project-location relations")
    }

    const deleteLoc = await fetch(`${API_URL}/locations/${locationId}`,{ method: "DELETE" })
        if (!deleteLoc.ok) {
        throw new Error("Error deleting location");
        }
}

    