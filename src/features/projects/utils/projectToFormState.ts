import type { Project } from '../types/project'
import type { ProjectFormState } from '../types/projectForm'

export default function projectToFormState(project:Project):ProjectFormState {
  return {
    name:project.name,
    clientId:project.clientId,
    startDate:project.startDate,
    endDate:project.endDate,
    city:project.city,
    area:project.area,
    locationBudget:String(project.locationBudget),
    peopleCount:String(project.peopleCount),
    description:project.description ?? "",
    notes:project.notes ?? "",
    productionType:project.productionType,
    operationalStatus:project.operationalStatus,
  }
}
