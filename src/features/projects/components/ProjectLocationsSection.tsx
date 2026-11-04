import ImageWithFallback from "../../../shared/components/ImageWithFallback"
import { useState } from "react"
import { Link } from "react-router"
import "../projects.css"
import type { ProjectLocationStatus } from "../../../shared/types/projectLocation"
import type { ProjectLocationWithData } from "../types/project"

type LocationStatusFilter = "all" | ProjectLocationStatus

type ProjectLocationsSectionProps = {
    projectId: string,
    projectLocationsWithData: ProjectLocationWithData[],
    onStatusChange: (relationId: string, newStatus: ProjectLocationStatus) => void,
    onMove: (relationId: string, direction: "up" | "down") => void,
    isUpdatingStatus: boolean,
    isReordering: boolean,
    updateStatusError: Error | null,
    reorderError: Error | null
}

export default function ProjectLocationsSection({projectId, projectLocationsWithData, onStatusChange, onMove, isUpdatingStatus, isReordering, updateStatusError, reorderError}:ProjectLocationsSectionProps) {

    const [selectedStatus, setSelectedStatus] = useState<LocationStatusFilter>("all")

    const filteredProjectLocations = projectLocationsWithData.filter((item)=>
      selectedStatus === "all" || item.relation.status === selectedStatus)

    const approvedSortedByOrder = projectLocationsWithData
      .filter((item)=>item.relation.status === "approved")
      .sort((a,b)=>(a.relation.order ?? 0) - (b.relation.order ?? 0))

    const visibleProjectLocations = selectedStatus === "approved" ? approvedSortedByOrder : filteredProjectLocations

    const firstApprovedId = approvedSortedByOrder[0]?.relation.id
    const lastApprovedId = approvedSortedByOrder[approvedSortedByOrder.length - 1]?.relation.id

  return (
    <section className="project-locations">
      <div className="page-header project-locations-header">
        <h2>Locations</h2>
        <Link to={`/projects/${projectId}/locations/add`} className="btn btn-primary">Add Locations</Link>
      </div>
      <div className="status-tabs" role="group" aria-label="Filter locations by status">
        <button type="button" className="status-tab" aria-pressed={selectedStatus === "all"} onClick={()=>setSelectedStatus("all")}>All</button>
        <button type="button" className="status-tab" aria-pressed={selectedStatus === "candidate"} onClick={()=>setSelectedStatus("candidate")}>Candidate</button>
        <button type="button" className="status-tab" aria-pressed={selectedStatus === "approved"} onClick={()=>setSelectedStatus("approved")}>Approved</button>
        <button type="button" className="status-tab" aria-pressed={selectedStatus === "rejected"} onClick={()=>setSelectedStatus("rejected")}>Rejected</button>
      </div>
      {updateStatusError && <p className="alert" role="alert">{updateStatusError.message}</p>}
      {reorderError && <p className="alert" role="alert">{reorderError.message}</p>}
      {visibleProjectLocations.length === 0 && <p className="empty">No locations to show</p>}
      <div className="list">
      {visibleProjectLocations.map((item, index)=>(
        <div key={item.relation.id} className="list-item project-location">
          <ImageWithFallback className="project-location-thumb" src={item.location.image} alt="" />
          <div className="list-item-main">
            <h3>{item.location.name}</h3>
            <p className="meta">{item.location.city} · {item.location.dailyPrice} € / day · up to {item.location.capacity} people</p>
            <div className="badges">
              <span className={`badge badge-${item.relation.status}`}>{item.relation.status}</span>
            </div>
          </div>
          <div className="project-location-controls">
          <select
            aria-label={`Status of ${item.location.name}`}
            value={item.relation.status}
            disabled={isUpdatingStatus}
            onChange={(e)=>onStatusChange(item.relation.id, e.target.value as ProjectLocationStatus)}
          >
            <option value="candidate">Candidate</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          {selectedStatus === "approved" && (
            <div className="reorder">
              {/* Show the position, not the stored value: un-approving a location leaves gaps in "order" */}
              <p className="reorder-position">Order: {index + 1}</p>
              <button
                type="button"
                className="btn btn-secondary btn-icon"
                aria-label={`Move ${item.location.name} up`}
                disabled={isReordering || item.relation.id === firstApprovedId}
                onClick={()=>onMove(item.relation.id, "up")}
              >↑</button>
              <button
                type="button"
                className="btn btn-secondary btn-icon"
                aria-label={`Move ${item.location.name} down`}
                disabled={isReordering || item.relation.id === lastApprovedId}
                onClick={()=>onMove(item.relation.id, "down")}
              >↓</button>
            </div>
          )}
          </div>
        </div>
      ))}
      </div>
    </section>
  )
}
