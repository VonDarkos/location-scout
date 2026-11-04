import { API_URL } from "../../../shared/config/api"
import type { ProjectLocation } from "../../../shared/types/projectLocation"


type CreateProjectLocationInput = Omit<ProjectLocation, "id">

export default async function createProjectLocations(projectId:string , locationIds:string[]):Promise<ProjectLocation[]> {

    const newProjectLocations:CreateProjectLocationInput[] = locationIds.map((locationId)=>({
        projectId,
        locationId,
        status:"candidate",
        addedAt:new Date().toISOString()
    }))

    const createdProjectLocations = await Promise.all(
        newProjectLocations.map(async (newProjectLocation)=>{
            const response = await fetch(`${API_URL}/projectLocations`, {method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(newProjectLocation)})

            if(!response.ok){
                throw new Error("error creating project location")
            }

            const createdProjectLocation:ProjectLocation = await response.json()
            return createdProjectLocation
        })
    )

    return createdProjectLocations
}
