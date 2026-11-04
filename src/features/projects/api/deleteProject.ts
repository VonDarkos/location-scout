import { API_URL } from "../../../shared/config/api"

import type { ProjectLocation } from "../../../shared/types/projectLocation"

export default async function deleteProject(projectId:string):Promise<void> {
  
    const response = await fetch(`${API_URL}/projectLocations?projectId=${projectId}`)
    if(!response.ok){
        throw new Error("Error loading project relations")
    }
    const projectLocations:ProjectLocation[] = await response.json()

    const deleteResponses  = await Promise.all(
        projectLocations.map((relation)=>
        fetch(`${API_URL}/projectLocations/${relation.id}`,{method:"DELETE"},))
    )

    const hasDeleteError = deleteResponses.some((response) => !response.ok)

    if(hasDeleteError){
        throw new Error("Error deleting project relations")
    }

    const deleteProj = await fetch(`${API_URL}/projects/${projectId}`,{ method: "DELETE" })
        if (!deleteProj.ok) {
        throw new Error("Error deleting project");
        }
}

    