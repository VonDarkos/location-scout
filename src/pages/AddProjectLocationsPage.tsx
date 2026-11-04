import { useState } from "react"
import usePageTitle from "../shared/hooks/usePageTitle"
import { useNavigate, useParams } from "react-router"
import useProjectQuery from "../features/projects/hooks/useProjectQuery"
import useLocationsQuery from "../features/locations/hooks/useLocationsQuery"
import useProjectLocationsQuery from "../features/projects/hooks/useProjectLocationsQuery"
import useCreateProjectLocationsMutation from "../features/projects/hooks/useCreateProjectLocationsMutation"
import LocationSelectionCard from "../features/projects/components/LocationSelectionCard"


export default function AddProjectLocationsPage() {

const {projectId} = useParams<{projectId:string}>()
const {data:project,isPending:isPendingProject,isError:isErrorProject,error:errorProject}= useProjectQuery(projectId)
  usePageTitle(project ? `Add Locations to ${project.name}` : "Add Locations")
const {data:locations,isPending:isPendingLocations,isError:isErrorLocations,error:errorLocations} = useLocationsQuery()
const {data:projectLocations,isPending:isPendingProjectLocations,isError:isErrorProjectLocations,error:errorProjectLocations} = useProjectLocationsQuery(projectId)
const [selectedLocationIds, setSelectedLocationIds] = useState<Set<string>>(new Set())
const {mutate:createProjectLocations,isPending:isCreating,isError:isCreateError,error:createError} = useCreateProjectLocationsMutation()
const navigate = useNavigate()

const handleSubmit = ()=>{
    if(!projectId || selectedLocationIds.size===0){
        return
    }

    createProjectLocations(
        {projectId, locationIds:[...selectedLocationIds]},
        {onSuccess:()=>navigate(`/projects/${projectId}`)}
    )
}


const toggleLocation = (locationId:string)=>{
    const nextSelectedLocationIds = new Set(selectedLocationIds)
    if(nextSelectedLocationIds.has(locationId)){
        nextSelectedLocationIds.delete(locationId)
    } else {
        nextSelectedLocationIds.add(locationId)
    }
    setSelectedLocationIds(nextSelectedLocationIds)
}

if(!projectId){
    return <p className="state">Invalid project...</p>
}

if(isPendingProject){
    return <p className="state" role="status">Loading Project ...</p>
}

if(isErrorProject){
    return <p className="state state-error" role="alert">{errorProject?.message}</p>
}

if(!project){
    return <p className="state">Project not found</p>
}

if(isPendingLocations){
    return <p className="state" role="status">Loading Locations ...</p>
}

if(isErrorLocations){
    return <p className="state state-error" role="alert">{errorLocations?.message}</p>
}

if(!locations){
    return <p className="state">Locations not found</p>
}

if(isPendingProjectLocations){
    return <p className="state" role="status">Loading Project Locations ...</p>
}

if(isErrorProjectLocations){
    return <p className="state state-error" role="alert">{errorProjectLocations?.message}</p>
}

if(!projectLocations){
    return <p className="state">Project locations not found</p>
}

const existingLocationIds = new Set(projectLocations.map((relation)=>relation.locationId))

  return (
    <>  
        <div className="page-header">
          <div>
            <h1>Add Locations to: {project.name}</h1>
            <p className="page-subtitle">{project.city} · {project.peopleCount} people · budget {project.locationBudget} € / day</p>
          </div>
        </div>
        <div className="selection-list">
        {locations.map((location)=>
            {
                const alreadyAssociated  = existingLocationIds.has(location.id)
                const capacityIncompatible = project.peopleCount > location.capacity
                const isDisabled = alreadyAssociated || capacityIncompatible
                const budgetWarning = location.dailyPrice > project.locationBudget
                const cityWarning = location.city !== project.city
                return (
                    <LocationSelectionCard
                        key={location.id}
                        location={location}
                        isSelected={selectedLocationIds.has(location.id)}
                        isDisabled={isDisabled}
                        isAlreadyAdded={alreadyAssociated}
                        capacityIncompatible={capacityIncompatible}
                        budgetWarning={budgetWarning}
                        cityWarning={cityWarning}
                        onToggle={toggleLocation}
                    />
                )
            }
        )}
        </div>
        {isCreateError && <p className="alert" role="alert">{createError?.message}</p>}
        <div className="selection-footer">
          <p className="meta" role="status">{selectedLocationIds.size} selected</p>
          <button type="button" className="btn btn-primary" disabled={selectedLocationIds.size===0 || isCreating} onClick={handleSubmit}>
              {isCreating ? "Adding..." : "Add selected locations"}
          </button>
        </div>
    </>
  )
}
