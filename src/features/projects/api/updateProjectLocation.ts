import { API_URL } from "../../../shared/config/api"
import type { ProjectLocation, UpdateProjectLocationInput } from "../../../shared/types/projectLocation"

export default async function updateProjectLocation(relationId:string, data:UpdateProjectLocationInput):Promise<ProjectLocation> {

    const response  = await fetch(`${API_URL}/projectLocations/${relationId}`, {method:"PATCH", headers:{"Content-Type": "application/json"}, body:JSON.stringify(data)})

    if(!response.ok){
        throw new Error("error updating project location")
    }
    const updatedRelation:ProjectLocation  = await response.json()
    return updatedRelation
}
