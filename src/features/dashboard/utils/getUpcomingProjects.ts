import type { Project } from "../../projects/types/project"
import getProjectTemporalStatus from "../../projects/utils/getProjectTemporalStatus"

export default function getUpcomingProjects(projects:Project[]):Project[] {
       const temporalStatusProjects = projects.filter((project)=>getProjectTemporalStatus(project.startDate, project.endDate) === "upcoming");

       const sortedProjectsUpcoming = temporalStatusProjects.sort((a,b)=>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()    
    ).slice(0,3)

    return sortedProjectsUpcoming
}
