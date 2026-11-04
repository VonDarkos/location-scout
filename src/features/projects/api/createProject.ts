import { API_URL } from "../../../shared/config/api"

import type { CreateProjectInput, Project} from '../types/project'

export default  async function createProject(newProject:CreateProjectInput):Promise<Project> {
  
    const response = await fetch(`${API_URL}/projects`, {method:"POST" , headers:{"Content-Type":"application/json"} ,body:JSON.stringify(newProject)})
   
    if(!response.ok){
        throw new Error("Error creating Project")
    }

    const data:Project = await response.json()

    return data
}
