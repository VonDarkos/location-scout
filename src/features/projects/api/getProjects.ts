import { API_URL } from "../../../shared/config/api"


//PER RICAVARE I PROJECT ED ESPORTARLI ALLA QUERY
import type { Project } from "../types/project"

export default async function getProjects():Promise<Project[]> {
    const response = await fetch(`${API_URL}/projects`)

    if(!response.ok){
        throw new Error("Error loading projects")
    }

    const data = await response.json()

    return data as Project[]
    
}

