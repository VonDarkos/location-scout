import { API_URL } from "../../../shared/config/api"
//OTTENERE SINGOLO PROGETTO TRAMITE ID
import type { Project } from "../types/project";
export default async function getProject(projectId:string):Promise<Project> {

    const response = await fetch(`${API_URL}/projects/${projectId}`)

    if(!response.ok){
        throw new Error ("Error loading Project") //error.message
    }

    const data = await response.json()
  
    return data as Project
}