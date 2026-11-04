import ImageWithFallback from "../../../shared/components/ImageWithFallback"
import type { Location } from "../types/location"
import { Link } from "react-router"
import "../locations.css"
type LocationCardProps = {
    location:Location
    isFavorite:boolean,
    onToggleFavorite:()=>void
}

export default function LocationCard({location,isFavorite,onToggleFavorite}: LocationCardProps){

 return (
            <article className="location-card">
              <ImageWithFallback className="location-card-image" src={location.image} alt="" loading="lazy" />
              <div className="location-card-body">
                <div className="location-card-heading">
                  <Link to={`/locations/${location.id}`} className="location-card-title">{location.name}</Link>
                  <span className="badge">{location.type}</span>
                </div>
                <p className="meta">{location.city} · {location.environment}</p>
                <div className="location-card-facts">
                  <span><strong>{location.dailyPrice} €</strong> / day</span>
                  <span>Up to {location.capacity} people</span>
                </div>
                <button
                  type="button"
                  className={isFavorite ? "btn btn-subtle favorite-button is-favorite" : "btn btn-subtle favorite-button"}
                  onClick={onToggleFavorite}
                >
                  <span aria-hidden="true">{isFavorite ? "★" : "☆"}</span>
                  {/* The label already says the state, so no aria-pressed; the hidden name tells cards apart */}
                  {isFavorite ? "Remove Favorite" : "Add to Favorites"}
                  <span className="visually-hidden">: {location.name}</span>
                </button>
              </div>
            </article>
 )

}
