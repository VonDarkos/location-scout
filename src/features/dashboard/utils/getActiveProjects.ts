import type { Project } from "../../projects/types/project"
import getProjectTemporalStatus from "../../projects/utils/getProjectTemporalStatus"

export default function getActiveProjects(projects:Project[]):Project[] {
    
    const temporalStatusActive = projects.filter((project)=>getProjectTemporalStatus(project.startDate,project.endDate)==="active")
    
    const sortedProjectsActive = temporalStatusActive.sort((a,b)=>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
    )
    return sortedProjectsActive
}
