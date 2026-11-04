import ImageWithFallback from "../../../shared/components/ImageWithFallback"
import type { Location } from "../../locations/types/location"
import "../projects.css"

type LocationSelectionCardProps = {
    location: Location,
    isSelected: boolean,
    isDisabled: boolean,
    isAlreadyAdded: boolean,
    capacityIncompatible: boolean,
    budgetWarning: boolean,
    cityWarning: boolean,
    onToggle: (locationId: string) => void
}

export default function LocationSelectionCard({location, isSelected, isDisabled, isAlreadyAdded, capacityIncompatible, budgetWarning, cityWarning, onToggle}:LocationSelectionCardProps) {

  const cardClassName = ["selection-card", isSelected && "is-selected", isDisabled && "is-disabled"].filter(Boolean).join(" ")
  const hasNotices = isAlreadyAdded || capacityIncompatible || budgetWarning || cityWarning
  const noticesId = `notices-${location.id}`

  return (
    <div className={cardClassName}>
        <label className="selection-card-main">
            <input
                type="checkbox"
                checked={isSelected}
                disabled={isDisabled}
                aria-describedby={hasNotices ? noticesId : undefined}
                onChange={()=>onToggle(location.id)}
            />
            <ImageWithFallback className="selection-card-thumb" src={location.image} alt="" />
            <span className="selection-card-text">
              <span className="selection-card-name">{location.name}</span>
              <span className="meta">{location.city} · {location.dailyPrice} € / day · up to {location.capacity} people</span>
            </span>
        </label>
        {hasNotices && (
          <div id={noticesId} className="notices">
            {isAlreadyAdded && <p className="notice notice-info">Already added</p>}
            {capacityIncompatible && <p className="notice notice-blocked">Not enough capacity</p>}
            {budgetWarning && <p className="notice notice-warning">Warning: Location Budget is higher than project budget</p>}
            {cityWarning && <p className="notice notice-warning">Warning: not same city</p>}
          </div>
        )}
    </div>
  )
}
