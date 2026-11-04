import { Link, useNavigate, useParams } from "react-router";
import usePageTitle from "../shared/hooks/usePageTitle"
import useClientQuery from "../features/clients/hooks/useClientQuery";
import getProjectTemporalStatus from "../features/projects/utils/getProjectTemporalStatus";
import useProjectQuery from "../features/projects/hooks/useProjectQuery";
import useDeleteProjectMutation from "../features/projects/hooks/useDeleteProjectMutation";
import useProjectLocationsQuery from "../features/projects/hooks/useProjectLocationsQuery";
import useLocationsQuery from "../features/locations/hooks/useLocationsQuery";
import type { ProjectLocationStatus } from "../shared/types/projectLocation";
import joinProjectLocations from "../features/projects/utils/joinProjectLocations";
import useUpdateProjectLocationMutation from "../features/projects/hooks/useUpdateProjectLocationMutation";
import useReorderProjectLocationsMutation from "../features/projects/hooks/useReorderProjectLocationsMutation";
import ProjectLocationsSection from "../features/projects/components/ProjectLocationsSection";

export default function ProjectDetailPage() {

  const { projectId } = useParams<{ projectId: string }>();
  const{data:project,isPending:projectIsPending,isError:projectIsError,error:projectError}= useProjectQuery(projectId)
  usePageTitle(project?.name ?? "Project")
  const {data:client, isPending:clientIsPending} = useClientQuery(project?.clientId)
  const {data:projectLocations, isPending:projectLocationsIsPending, isError:projectLocationsIsError, error:projectLocationsError} = useProjectLocationsQuery(projectId)
  const {data:locations, isPending:locationsIsPending, isError:locationsIsError, error:locationsError} = useLocationsQuery()
  const { mutate: deleteProject, isPending: isDeleting, isError: isDeleteError, error: deleteError} = useDeleteProjectMutation()
  const navigate = useNavigate()
  const { mutate: updateProjectLocation, isPending: isUpdatingStatus, error: updateStatusError} = useUpdateProjectLocationMutation()
  const { mutate: reorderProjectLocation, isPending: isReordering, error: reorderError} = useReorderProjectLocationsMutation()


  const handleDelete = ()=>{
    if(projectId){
      const isConfirmed = window.confirm("Are you sure you want to delete this project?")
      if(isConfirmed){
        deleteProject(projectId,{onSuccess:()=>navigate(`/projects/`)})
      }
    }
    
  }

  const handleStatusChange = (relationId:string, newStatus:ProjectLocationStatus)=>{
    if(newStatus==="approved"){
      const allApprovedProjectLocations = projectLocations?.filter((proj)=>proj.status === "approved") ?? []
      const orders = allApprovedProjectLocations.map((appProj)=>appProj.order ?? 0)
      const maxOrder = Math.max(0, ...orders)
      const newOrder = maxOrder + 1
      updateProjectLocation({relationId, data:{status:newStatus, order:newOrder}})
    } else {
      updateProjectLocation({relationId, data:{status:newStatus, order:null}})
    }
  }

  const handleMove = (relationId:string, direction:"up" | "down")=>{
    if(!projectId) return

    const onlyApproved = projectLocations?.filter((relation)=>relation.status === "approved") ?? []
    const sortedApproved = onlyApproved.sort((a,b)=>(a.order ?? 0) - (b.order ?? 0))

    const index = sortedApproved.findIndex((relation)=>relation.id === relationId)
    if(index === -1) return

    const neighbourIndex = direction === "up" ? index - 1 : index + 1
    const current = sortedApproved[index]
    const neighbour = sortedApproved[neighbourIndex]
    if(!neighbour) return

    reorderProjectLocation({projectId, updates:[
      {relationId:current.id, order:neighbour.order ?? 0},
      {relationId:neighbour.id, order:current.order ?? 0}
    ]})
  }


  if (!projectId) {
  return <p className="state">Invalid project</p>;
  }

  if(projectIsPending){
    return <p className="state" role="status">Loading Project...</p>
  }

  if(projectIsError){
    return <p className="state state-error" role="alert">{projectError?.message}</p>
  }

  if(!project){
    return <p className="state">Project not found</p>
  }

  if(projectLocationsIsPending){
    return <p className="state" role="status">Loading project locations...</p>
  }

  if(projectLocationsIsError){
    return <p className="state state-error" role="alert">{projectLocationsError?.message}</p>
  }

  if(locationsIsPending){
    return <p className="state" role="status">Loading locations...</p>
  }

  if(locationsIsError){
    return <p className="state state-error" role="alert">{locationsError?.message}</p>
  }

  if(!projectLocations || !locations){
    return <p className="state">Project locations not available</p>
  }

  const projectLocationsWithData = joinProjectLocations(projectLocations, locations)


    const temporalStatus = getProjectTemporalStatus(project.startDate, project.endDate)

    return (
    <>
      <div className="page-header">
        <div>
          <h1>{project.name}</h1>
          <div className="badges project-badges">
            <span className={`badge badge-${temporalStatus}`}>{temporalStatus}</span>
            <span className={`badge badge-${project.operationalStatus}`}>Operational: {project.operationalStatus}</span>
          </div>
        </div>
        <div className="actions">
          <Link to={`/projects/${projectId}/edit`} className="btn btn-secondary">Edit</Link>
          <button type="button" className="btn btn-danger" disabled={isDeleting} onClick={handleDelete}>{isDeleting ? "Deleting... " : "Delete Project"}</button>
        </div>
      </div>

      {isDeleteError&&<p className="alert" role="alert">{deleteError?.message}</p>}

      <div className="card">
        <dl className="detail-list">
          <div>
            <dt>Client</dt>
            <dd>{client ? <Link to={`/clients/${client.id}`}>{client.name}</Link> : clientIsPending ? "Loading..." : "Not available"}</dd>
          </div>
          <div><dt>Production Type</dt><dd>{project.productionType}</dd></div>
          <div><dt>Start Date</dt><dd>{project.startDate}</dd></div>
          <div><dt>End Date</dt><dd>{project.endDate}</dd></div>
          <div><dt>Temporal Status</dt><dd>{temporalStatus}</dd></div>
          <div><dt>Operational Status</dt><dd>{project.operationalStatus}</dd></div>
          <div><dt>City</dt><dd>{project.city}</dd></div>
          <div><dt>Area</dt><dd>{project.area}</dd></div>
          <div><dt>Location Budget</dt><dd>{project.locationBudget} € / day</dd></div>
          <div><dt>People Count</dt><dd>{project.peopleCount}</dd></div>
          {project.description && <div className="detail-wide"><dt>Description</dt><dd className="detail-text">{project.description}</dd></div>}
          {project.notes && <div className="detail-wide"><dt>Notes</dt><dd className="detail-text">{project.notes}</dd></div>}
        </dl>
      </div>

    <ProjectLocationsSection
      projectId={projectId}
      projectLocationsWithData={projectLocationsWithData}
      onStatusChange={handleStatusChange}
      onMove={handleMove}
      isUpdatingStatus={isUpdatingStatus}
      isReordering={isReordering}
      updateStatusError={updateStatusError}
      reorderError={reorderError}
    />
    </>
    
  )
}
   