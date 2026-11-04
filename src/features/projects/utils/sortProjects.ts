import type { Client } from "../../clients/types/client"
import type { Project } from "../types/project"

export default function sortProjects(projects:Project[], sort:string, clients:Client[]):Project[] {

const getClientName = (clientId:string)=>
    clients.find((client)=>client.id === clientId)?.name ?? "" // TROVO CLIENT PER POTERLI COMPARARE 

return [...projects].sort((a,b)=>{

    if(sort==="name-asc"){
        return a.name.localeCompare(b.name)
    }

    if(sort==="name-desc"){
        return b.name.localeCompare(a.name)
    }

    if(sort==="startDate-asc"){
        return a.startDate.localeCompare(b.startDate)
    }

    if(sort === "startDate-desc"){
        return b.startDate.localeCompare(a.startDate)
    }

    if(sort === "budget-asc"){
      return  a.locationBudget - b.locationBudget
    }

    if(sort === "budget-desc"){
        return b.locationBudget - a.locationBudget
    }

    if(sort === "client-asc"){
        return getClientName(a.clientId).localeCompare(getClientName(b.clientId))
    }

    if(sort === "client-desc"){
        return getClientName(b.clientId).localeCompare(getClientName(a.clientId))
    }
      return 0
})

}
