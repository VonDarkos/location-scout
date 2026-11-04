import { API_URL } from "../../../shared/config/api"
import type { Project, UpdateProjectInput } from "../types/project"



export default async function updateProject(projectId:string, data:UpdateProjectInput):Promise<Project> {

    const response  = await fetch(`${API_URL}/projects/${projectId}`, {method:"PATCH", headers:{"Content-Type": "application/json"}, body:JSON.stringify(data)})

    if(!response.ok){
        throw new Error("Error updating project")
    }

    const project:Project = await response.json()

  return project
}
