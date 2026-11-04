import { API_URL } from "../../../shared/config/api"

import type { Project } from "../../projects/types/project"
import deleteProject from "../../projects/api/deleteProject"

export default async function deleteClient(clientId:string):Promise<void> {

    const response = await fetch(`${API_URL}/projects?clientId=${clientId}`)
    if(!response.ok){
        throw new Error("Error loading client projects")
    }
    const clientProjects:Project[] = await response.json()

    await Promise.all(
        clientProjects.map((project)=>deleteProject(project.id))
    )

    const deleteClientResponse = await fetch(`${API_URL}/clients/${clientId}`,{ method: "DELETE" })
    if (!deleteClientResponse.ok) {
        throw new Error("Error deleting the client");
    }
}
