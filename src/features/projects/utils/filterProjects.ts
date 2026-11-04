import type { Project } from '../types/project'
import getProjectTemporalStatus from './getProjectTemporalStatus'

export function matchesBudget(
  locationBudget: number,
  budget: string,
): boolean {
  if(budget==="under-1000") return locationBudget <1000;
      else if(budget==="1000-2500") return locationBudget>=1000 && locationBudget<=2500;
      else if(budget==="2501-5000") return locationBudget>2500 && locationBudget<=5000
      else if(budget==="over-5000") return locationBudget>5000;
      else return budget === "all"

}

type ProjectFilters = {
    search:string,
    client:string,
    budget:string,
    temporalStatus:string,
    operationalStatus:string,
}

export default function filterProjects(
    projects:Project[],
    {search,client,budget,temporalStatus,operationalStatus}:ProjectFilters
):Project[]{
    return projects.filter((project)=>{

    const nameFiltered = project.name.toLowerCase().includes(search.toLowerCase())
    const clientFiltered = client === "all" || project.clientId === client
    const budgetFiltered = matchesBudget(project.locationBudget,budget)
    const temporalStatusFiltered = temporalStatus === "all" || getProjectTemporalStatus(project.startDate,project.endDate) === temporalStatus
    const operationalStatusFiltered = operationalStatus === "all" || project.operationalStatus === operationalStatus

    return nameFiltered && clientFiltered && budgetFiltered && temporalStatusFiltered && operationalStatusFiltered
  })
}
