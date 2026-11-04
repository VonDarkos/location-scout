
import ImageWithFallback from "../shared/components/ImageWithFallback"
import useLocationQuery from "../features/locations/hooks/useLocationQuery";
import usePageTitle from "../shared/hooks/usePageTitle"
import { Link, useParams } from "react-router";
import useDeleteLocationMutation from "../features/locations/hooks/useDeleteLocationMutation";
import { useNavigate } from "react-router";
import "../features/locations/locations.css";
export default function LocationDetailPage() {
const {locationId} = useParams<{locationId:string}>()
const {data ,isPending,isError,error}=useLocationQuery(locationId)
  usePageTitle(data?.name ?? "Location")
const navigate = useNavigate()
const { mutate: deleteLocation,isPending: isDeleting, isError: isDeleteError, error: deleteError} = useDeleteLocationMutation()

const handleDelete = ()=>{
  if(locationId){
    const isConfirmed = window.confirm(
      "Delete this location?\n\nIt will also be removed from every project it is associated with.\nThe projects themselves will not be deleted.\n\nThis cannot be undone."
    )
    if(isConfirmed){
      deleteLocation(locationId,{onSuccess:()=>navigate(`/locations/`)})
  }
  }
}


  if(isPending){
    return <p className="state" role="status">Loading...</p>
  }

  if(isError){
    return <p className="state state-error" role="alert">{error?.message}</p>
  }

  if (!data) return <p className="state">Location not found</p>;

  const yesNo = (value:boolean)=> value ? "Yes" : "No"

  return (
    <>
      <div className="page-header">
        <div>
          <h1>{data.name}</h1>
          <p className="page-subtitle">{data.city} · {data.address}</p>
        </div>
        <div className="actions">
          <Link to={`/locations/${data.id}/edit`} className="btn btn-secondary">Edit</Link>
          <button type="button" className="btn btn-danger" disabled={isDeleting} onClick={handleDelete}>{isDeleting ? "Deleting" : "Delete Location"}</button>
        </div>
      </div>

      {isDeleteError&&<p className="alert" role="alert">{deleteError?.message}</p>}

      <div className="location-detail">
        <ImageWithFallback className="location-detail-image" src={data.image} alt={data.name} />

        <div className="card">
          <div className="badges">
            <span className="badge">{data.type}</span>
            <span className="badge">{data.environment}</span>
          </div>

          <dl className="detail-list location-detail-list">
            <div><dt>Daily Price</dt><dd>{data.dailyPrice} €</dd></div>
            <div><dt>Capacity</dt><dd>{data.capacity} people</dd></div>
            <div><dt>Surface</dt><dd>{data.surface} m²</dd></div>
            <div><dt>Parking</dt><dd>{yesNo(data.parking)}</dd></div>
            <div><dt>Natural light</dt><dd>{yesNo(data.naturalLight)}</dd></div>
            <div><dt>Electricity</dt><dd>{yesNo(data.electricity)}</dd></div>
            <div><dt>Accessible</dt><dd>{yesNo(data.accessible)}</dd></div>
            <div><dt>Contact</dt><dd>{data.contactName}</dd></div>
            {data.phone && <div><dt>Phone</dt><dd>{data.phone}</dd></div>}
            {data.email && <div><dt>Email</dt><dd>{data.email}</dd></div>}
            {data.description && <div className="detail-wide"><dt>Description</dt><dd className="detail-text">{data.description}</dd></div>}
            {data.notes && <div className="detail-wide"><dt>Notes</dt><dd className="detail-text">{data.notes}</dd></div>}
          </dl>
        </div>
      </div>
    </>
  );
}
