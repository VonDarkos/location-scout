import { API_URL } from "../../../shared/config/api"
import type { ProjectLocation } from "../../../shared/types/projectLocation"


export default async function getProjectLocations(projectId:string):Promise<ProjectLocation[]> {
 
    const response = await fetch(`${API_URL}/projectLocations?projectId=${projectId}`)

    if(!response.ok){
        throw new Error("Error loading project locations")
    }

    const data:ProjectLocation[]= await response.json()
 
    return data
}
