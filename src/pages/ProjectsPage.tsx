import { Link, } from 'react-router'
import usePageTitle from "../shared/hooks/usePageTitle"
import useProjectsQuery from '../features/projects/hooks/useProjectsQuery'
import useClientsQuery from '../features/clients/hooks/useClientsQuery'
import useProjectFiltersParams from '../features/projects/hooks/useProjectFiltersParams'
import filterProjects from '../features/projects/utils/filterProjects'
import sortProjects from '../features/projects/utils/sortProjects'
import ProjectFiltersPanel from '../features/projects/components/ProjectFiltersPanel'
import getProjectTemporalStatus from '../features/projects/utils/getProjectTemporalStatus'

export default function ProjectsPage() {
  usePageTitle("Projects")
  
  const{data:projects,isPending:isProjectPending,isError:isProjectError,error:projectError} = useProjectsQuery()
  const {data:clients,isPending:isClientsPending,isError:isClientsError,error:clientsError} = useClientsQuery()
  const{
    search,client,budget,temporalStatus,operationalStatus,sort,
    readSearch,readClient,readBudget,readTemporalStatus,readOperationalStatus,readSort,
    handleResetFilters
  }=useProjectFiltersParams()
  
  if(isProjectPending){
    return <p className="state" role="status">Loading Projects....</p>
  }

  if(isProjectError){
    return <p className="state state-error" role="alert">{projectError?.message}</p>
  }


  if(isClientsPending){
    return <p className="state" role="status">Loading Clients</p>
  }

  if(isClientsError){
    return <p className="state state-error" role="alert">{clientsError?.message}</p>
  }

    if(clients?.length===0){
    return <p className="state">No Clients Found</p>
  }

  if(projects?.length===0){
    return (
      <>
        <div className="page-header">
          <h1>Projects</h1>
          <Link to="/projects/new" className="btn btn-primary">New Project</Link>
        </div>
        <p className="empty">No Projects Found</p>
      </>
    )
  }

  const projectsFiltered = filterProjects(projects ?? [],{search,client,budget,temporalStatus,operationalStatus})
  const sortedProjects = sortProjects(projectsFiltered,sort,clients ?? [])
  return (

    <>
      <div className="page-header">
        <h1>Projects</h1>
        <Link to="/projects/new" className="btn btn-primary">New Project</Link>
      </div>
      <div>
          <ProjectFiltersPanel
            search={search}
            client={client}
            budget={budget}
            temporalStatus={temporalStatus}
            operationalStatus={operationalStatus}
            sort={sort}
            clients={clients ?? []}
            onSearchChange={readSearch}
            onClientChange={readClient}
            onBudgetChange={readBudget}
            onTemporalStatusChange={readTemporalStatus}
            onOperationalStatusChange={readOperationalStatus}
            onSortChange={readSort}
            onResetFilters={handleResetFilters}
          />

          {sortedProjects.length===0 &&
           <div className="empty">
            <p>No projects match current filters</p>
            <button type='button' className="btn btn-secondary" onClick={handleResetFilters}>Reset Filters</button>
            </div>}

      <div className="list">
      {sortedProjects.map((project)=>{
        const projectTemporalStatus = getProjectTemporalStatus(project.startDate, project.endDate)
        const clientName = clients?.find((clientOption)=>clientOption.id === project.clientId)?.name
        return (
        <div key={project.id} className="list-item">
          <div className="list-item-main">
            <h2><Link to={`/projects/${project.id}`} className="list-item-title">{project.name}</Link></h2>
            <p className="meta">
              {clientName && <>{clientName} · </>}{project.city} · {project.startDate} → {project.endDate}
            </p>
          </div>
          <div className="badges">
            <span className={`badge badge-${projectTemporalStatus}`}>{projectTemporalStatus}</span>
            {project.operationalStatus !== "none" && <span className={`badge badge-${project.operationalStatus}`}>{project.operationalStatus}</span>}
          </div>
        </div>
        )
      })}
      </div>
    </div>

    </>
    
  )
}
