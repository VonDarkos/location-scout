import ImageWithFallback from "../shared/components/ImageWithFallback"
import { Link } from 'react-router'
import usePageTitle from "../shared/hooks/usePageTitle"
import useLocationsQuery from '../features/locations/hooks/useLocationsQuery'
import useProjectsQuery from '../features/projects/hooks/useProjectsQuery'
import getUpcomingProjects from '../features/dashboard/utils/getUpcomingProjects'
import getActiveProjects from '../features/dashboard/utils/getActiveProjects'
import getRecentLocations from '../features/dashboard/utils/getRecentLocations'
import '../features/dashboard/dashboard.css'


export default function DashboardPage() {
  usePageTitle("Dashboard")

  const {data:locations,isPending:isPendingLocations,isError:isErrorLocations,error:errorLocations} = useLocationsQuery()
  const {data:projects, isPending:isPendingProjects, isError:isErrorProjects, error:errorProjects} = useProjectsQuery()


  if(isPendingLocations){
    return <p className="state" role="status">Loading Locations ...</p>
  }
  
  if(isErrorLocations){
    return <p className="state state-error" role="alert">{errorLocations?.message}</p>
  }

  if(isPendingProjects){
    return <p className="state" role="status">Loading Projects ...</p>
  }

  if(isErrorProjects){
    return <p className="state state-error" role="alert">{errorProjects?.message}</p>
  }

  if(!locations || !projects){
    return <p className="state">Dashboard data not available</p>
  }

  const upcomingProjects = getUpcomingProjects(projects)
  const activeProjects  = getActiveProjects(projects)
  const recentLocations = getRecentLocations(locations)

  return (

    <>
    <div className="page-header">
      <div>
        <h1>Dashboard</h1>
        <p className="page-subtitle">Your productions and latest locations at a glance.</p>
      </div>
      <div className="quick-actions actions">
        <Link to={"/projects/new"} className="btn btn-primary">Create Project</Link>
        <Link to={"/locations/new"} className="btn btn-secondary">Create Location</Link>
        <Link to={"/clients/new"} className="btn btn-secondary">Create Client</Link>
      </div>
    </div>

    <div className="dashboard-grid">
      <section className="card dashboard-section upcoming-projects">
        <h2>Upcoming Projects</h2>
        {upcomingProjects.length === 0 ? <p className="empty">No upcoming projects</p> :
        upcomingProjects.map((upcoming)=>
      (
        <div key={upcoming.id} className="dashboard-item">
          <div className="dashboard-item-main">
            <h3>{upcoming.name}</h3>
            <p className="meta">{upcoming.city} · {upcoming.startDate} → {upcoming.endDate}</p>
          </div>
          <Link to={`/projects/${upcoming.id}`} className="btn btn-subtle">Open Project<span className="visually-hidden"> {upcoming.name}</span></Link>
        </div>
      ))}
      </section>

      <section className="card dashboard-section active-projects">
          <h2>Active Projects</h2>
            {activeProjects.length === 0 ? <p className="empty">No active projects</p> :
            activeProjects.map((active)=>(
              <div key={active.id} className="dashboard-item">
                <div className="dashboard-item-main">
                  <h3>{active.name}</h3>
                  <p className="meta">{active.city} · {active.startDate} → {active.endDate}</p>
                </div>
                <Link to={`/projects/${active.id}`} className="btn btn-subtle">Open Project<span className="visually-hidden"> {active.name}</span></Link>
              </div>
            ))}

      </section>

      <section className="card dashboard-section recent-locations">
          <h2>Recent Locations</h2>
            {recentLocations.length === 0 ? <p className="empty">No locations yet</p> :
            recentLocations.map((location)=>(
              <div key={location.id} className="dashboard-item">
                <ImageWithFallback className="dashboard-thumb" src={location.image} alt="" />
                <div className="dashboard-item-main">
                  <h3>{location.name}</h3>
                  <p className="meta">{location.city} · {location.type}</p>
                </div>
                <Link to={`/locations/${location.id}`} className="btn btn-subtle">Open Location<span className="visually-hidden"> {location.name}</span></Link>
              </div>
            ))}

      </section>

    </div>

    </>

  )
}
